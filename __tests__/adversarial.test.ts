import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as dgram from 'dgram';
import { handleRequest } from '../src/proxy';
import { matchIp, matchIP, ipToLong, matchCIDR } from '../src/lib/ipMatcher';

// Use a unique port to avoid conflicts
const TEST_PORT = 52418;
const TEST_LOG_FILE = path.resolve(process.cwd(), 'telemetry-adversarial-direct.jsonl');

function readLogLines(): any[] {
  if (!fs.existsSync(TEST_LOG_FILE)) return [];
  const content = fs.readFileSync(TEST_LOG_FILE, 'utf8');
  return content.trim().split('\n').filter(Boolean).map(line => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter((x) => x !== null);
}

function clearLogFile() {
  if (fs.existsSync(TEST_LOG_FILE)) {
    fs.writeFileSync(TEST_LOG_FILE, '', 'utf8');
  }
}

function deleteLogFile() {
  if (fs.existsSync(TEST_LOG_FILE)) {
    try {
      fs.unlinkSync(TEST_LOG_FILE);
    } catch {}
  }
}

async function waitForLogs(expectedCount: number, timeoutMs = 1500): Promise<any[]> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    const lines = readLogLines();
    if (lines.length >= expectedCount) {
      return lines;
    }
    await new Promise(resolve => setTimeout(resolve, 20));
  }
  return readLogLines();
}

describe('White-Box Adversarial Hardening Tests', () => {
  let startDaemon: any;
  let shutdown: any;
  let validatePayload: any;
  let daemonSocket: dgram.Socket | null = null;
  let consoleErrorSpy: any;
  let consoleLogSpy: any;
  let exitSpy: any;

  let originalPort: string | undefined;
  let originalLogFile: string | undefined;

  beforeEach(async () => {
    originalPort = process.env.TELEMETRY_PORT;
    originalLogFile = process.env.TELEMETRY_LOG_FILE;

    vi.resetModules();
    process.env.TELEMETRY_PORT = String(TEST_PORT);
    process.env.TELEMETRY_LOG_FILE = TEST_LOG_FILE;
    clearLogFile();

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const daemonModule = require('../src/telemetry-daemon.js');
    startDaemon = daemonModule.startDaemon;
    shutdown = daemonModule.shutdown;
    validatePayload = daemonModule.validatePayload;

    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(async () => {
    console.log('DEBUG: exitSpy calls in afterEach:', exitSpy.mock.calls);
    vi.restoreAllMocks();
    if (daemonSocket) {
      await new Promise<void>(resolve => {
        try {
          daemonSocket!.close(() => resolve());
        } catch {
          resolve();
        }
      });
      daemonSocket = null;
    }
    deleteLogFile();

    if (originalPort !== undefined) {
      process.env.TELEMETRY_PORT = originalPort;
    } else {
      delete process.env.TELEMETRY_PORT;
    }
    if (originalLogFile !== undefined) {
      process.env.TELEMETRY_LOG_FILE = originalLogFile;
    } else {
      delete process.env.TELEMETRY_LOG_FILE;
    }
  });

  // ==========================================
  // 1. IP Matcher Adversarial Gaps
  // ==========================================
  describe('IP Matcher Gaps', () => {
    it('ipToLong - handles non-string types safely', () => {
      expect(ipToLong(null as any)).toBe(-1);
      expect(ipToLong(undefined as any)).toBe(-1);
      expect(ipToLong(12345 as any)).toBe(-1);
      expect(ipToLong({} as any)).toBe(-1);
      expect(ipToLong([] as any)).toBe(-1);
      expect(ipToLong((() => {}) as any)).toBe(-1);
    });

    it('ipToLong - rejects leading/trailing dots and empty segments', () => {
      expect(ipToLong('.1.2.3.4')).toBe(-1);
      expect(ipToLong('1.2.3.4.')).toBe(-1);
      expect(ipToLong('1..2.3.4')).toBe(-1);
      expect(ipToLong('1.2..4')).toBe(-1);
    });

    it('ipToLong - rejects octets with non-numeric chars or spaces inside', () => {
      expect(ipToLong('12 7.0.0.1')).toBe(-1);
      expect(ipToLong('127.0.0.1a')).toBe(-1);
      expect(ipToLong('127.0.0.1 ')).toBe(2130706433); // trailing space trimmed is ok
      expect(ipToLong('127.0.0. 1')).toBe(-1);
      expect(ipToLong('127.0.0.0x1')).toBe(-1);
    });

    it('matchCIDR - handles invalid inputs and prototype keys gracefully', () => {
      expect(matchCIDR('127.0.0.1', 'constructor/24')).toBe(false);
      expect(matchCIDR('__proto__', '127.0.0.0/24')).toBe(false);
      expect(matchCIDR('127.0.0.1', '127.0.0.0/')).toBe(false);
      expect(matchCIDR('127.0.0.1', '/24')).toBe(false);
      expect(matchCIDR('127.0.0.1', '127.0.0.0/33')).toBe(false);
      expect(matchCIDR('127.0.0.1', '127.0.0.0/-1')).toBe(false);
    });

    it('matchIp - handles non-string objects and returns false cleanly', () => {
      const badObj = { toString: () => '166.82.1.1' };
      const res = matchIp(badObj as any);
      expect(res.isFlagged).toBe(false);
      expect(res.matchedAgency).toBeNull();
    });
  });

  // ==========================================
  // 2. Proxy Payload & Transmission Failure Gaps
  // ==========================================
  describe('Proxy Interception and UDP Failures', () => {
    it('non-blocking handling of extremely large payloads (> 65507 bytes)', async () => {
      // Create request with extremely long path to force large payload
      const hugePath = '/' + 'B'.repeat(70000);
      const req = new Request(`http://localhost${hugePath}`, {
        headers: { 'X-Mock-IP': '8.8.8.8' }
      });

      // Verification: Should resolve to 200 OK and not crash/block the thread
      const resp = await handleRequest(req);
      expect(resp.status).toBe(200);
      const data = await resp.json();
      expect(data.success).toBe(true);
    });

    it('gracefully handles missing, malformed or out-of-bounds port env', async () => {
      const testCases = ['-1', 'abc', '999999', '0.5', ''];
      for (const badPort of testCases) {
        process.env.TELEMETRY_PORT = badPort;
        const req = new Request('http://localhost/', {
          headers: { 'X-Mock-IP': '8.8.8.8' }
        });
        const resp = await handleRequest(req);
        expect(resp.status).toBe(200);
      }
    });

    it('correctly handles whitespace-padded multi-hop X-Forwarded-For', async () => {
      const req = new Request('http://localhost/', {
        headers: {
          'X-Forwarded-For': '  166.82.5.5  ,  10.0.0.1  '
        }
      });
      const resp = await handleRequest(req);
      const data = await resp.json();
      expect(data.logged.ip_address).toBe('166.82.5.5');
      expect(data.logged.is_flagged).toBe(true);
      expect(data.logged.matched_agency).toBe('Commonwealth of Virginia VITA Block 1');
    });

    it('handles multiple X-Forwarded-For headers gracefully', async () => {
      const headers = new Headers();
      headers.append('X-Forwarded-For', '198.244.100.1');
      headers.append('X-Forwarded-For', '10.0.0.1');
      const req = new Request('http://localhost/', { headers });
      const resp = await handleRequest(req);
      const data = await resp.json();
      // Combined headers are typically comma-separated
      expect(data.logged.ip_address).toBe('198.244.100.1');
      expect(data.logged.is_flagged).toBe(true);
      expect(data.logged.matched_agency).toBe('Fairfax County');
    });
  });

  // ==========================================
  // 3. Telemetry Daemon Validation & Safety Gaps
  // ==========================================
  describe('Telemetry Daemon Robustness', () => {
    it('validatePayload - strips extra properties and handles prototype pollution keys', () => {
      const payloadWithPollution = {
        timestamp: '2026-06-14T05:57:00.000Z',
        ip_address: '127.0.0.1',
        pathname: '/',
        user_agent: 'Vitest',
        is_flagged: false,
        matched_agency: null,
        __proto__: { polluted: true },
        constructor: 'malicious'
      };

      const res = validatePayload(payloadWithPollution);
      expect(res).not.toHaveProperty('polluted');
      expect((res as any).constructor).not.toBe('malicious');
      expect(res.ip_address).toBe('127.0.0.1');
    });

    it('daemon handles malformed JSON packets on socket without crashing', async () => {
      const PORT_A = 52418;
      daemonSocket = startDaemon(PORT_A, '127.0.0.1');
      await new Promise<void>((resolve, reject) => {
        try {
          if (daemonSocket && daemonSocket.address()) {
            resolve();
            return;
          }
        } catch {}
        daemonSocket!.once('listening', resolve);
        daemonSocket!.once('error', (err) => reject(new Error('Socket bind failed: ' + err.message)));
      });

      const client = dgram.createSocket('udp4');
      const badData = Buffer.from('invalid-json-content-string-123');
      
      await new Promise<void>((resolve) => {
        client.send(badData, 0, badData.length, PORT_A, '127.0.0.1', () => resolve());
      });

      // Give daemon time to process packet and make sure it doesn't crash
      await new Promise(resolve => setTimeout(resolve, 100));
      client.close();

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error processing telemetry packet:'));
    });

    it('daemon rejects non-object payloads or arrays on socket', () => {
      expect(() => validatePayload([])).toThrow();
      expect(() => validatePayload(12345)).toThrow();
      expect(() => validatePayload('not-an-object')).toThrow();
    });

    it('shutdown function closes server and exits with code 0', async () => {
      const PORT_B = 52419;
      console.log('DEBUG: startDaemon called');
      daemonSocket = startDaemon(PORT_B, '127.0.0.1');
      console.log('DEBUG: daemonSocket created');
      await new Promise<void>((resolve, reject) => {
        try {
          if (daemonSocket && daemonSocket.address()) {
            console.log('DEBUG: socket already bound');
            resolve();
            return;
          }
        } catch (e: any) {
          console.log('DEBUG: address check threw', e.message);
        }
        daemonSocket!.once('listening', () => {
          console.log('DEBUG: listening event fired');
          resolve();
        });
        daemonSocket!.once('error', (err) => {
          console.log('DEBUG: error event fired', err.message);
          reject(new Error('Socket bind failed: ' + err.message));
        });
      });

      console.log('DEBUG: calling shutdown');
      shutdown();
      console.log('DEBUG: shutdown called, starting check loop');

      // Wait for socket close callback to execute and call process.exit
      await new Promise<void>(resolve => {
        const check = () => {
          console.log('DEBUG: checking exitSpy mock calls length', exitSpy.mock.calls.length);
          if (exitSpy.mock.calls.length > 0) resolve();
          else setTimeout(check, 20);
        };
        check();
      });

      console.log('DEBUG: exitSpy called, asserting');
      expect(exitSpy).toHaveBeenCalledWith(0);
    });
  });
});
