import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as dgram from 'dgram';
import { handleRequest } from '../../src/proxy';
import { matchIP, ipToLong, matchCIDR } from '../../src/lib/ipMatcher';

// Use a unique port for these adversarial tests to avoid collisions
const TEST_PORT = 51416;
const TEST_LOG_FILE = path.resolve(process.cwd(), 'telemetry-adversarial-custom.jsonl');

// Helper to read all lines from the log file
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

// Helper to clear the log file
function clearLogFile() {
  if (fs.existsSync(TEST_LOG_FILE)) {
    fs.writeFileSync(TEST_LOG_FILE, '', 'utf8');
  }
}

// Helper to delete the log file
function deleteLogFile() {
  if (fs.existsSync(TEST_LOG_FILE)) {
    try {
      fs.unlinkSync(TEST_LOG_FILE);
    } catch {}
  }
}

// Helper to wait for log lines
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

describe('Adversarial Custom Hardening Test Suite', () => {
  let startDaemon: any;
  let shutdown: any;
  let validatePayload: any;
  let daemonSocket: dgram.Socket | null = null;
  let consoleErrorSpy: any;
  let consoleLogSpy: any;
  let exitSpy: any;

  let originalPort: string | undefined;
  let originalLogFile: string | undefined;
  let originalTestMain: string | undefined;

  beforeEach(async () => {
    originalPort = process.env.TELEMETRY_PORT;
    originalLogFile = process.env.TELEMETRY_LOG_FILE;
    originalTestMain = process.env.TELEMETRY_TEST_MAIN;

    vi.resetModules();
    process.env.TELEMETRY_PORT = String(TEST_PORT);
    process.env.TELEMETRY_LOG_FILE = TEST_LOG_FILE;
    process.env.TELEMETRY_TEST_MAIN = 'true';
    clearLogFile();

    // Dynamically load the daemon module for each test
    const daemonModule = await import('../../src/telemetry-daemon.js');
    startDaemon = daemonModule.startDaemon;
    shutdown = daemonModule.shutdown;
    validatePayload = daemonModule.validatePayload;

    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(async () => {
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

    // Restore env variables
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
    if (originalTestMain !== undefined) {
      process.env.TELEMETRY_TEST_MAIN = originalTestMain;
    } else {
      delete process.env.TELEMETRY_TEST_MAIN;
    }
  });

  // ==========================================
  // 1. IP Matcher Vulnerability & Edge Case Tests
  // ==========================================
  describe('IP Matcher Edge Cases', () => {
    it('IPv6 inputs return false safely and do not crash', () => {
      // IPv6 local host and global IPs should be handled without crashing, returning no match
      const ipv6Result1 = matchIP('::1');
      expect(ipv6Result1.is_flagged).toBe(false);
      expect(ipv6Result1.matched_agency).toBeNull();

      const ipv6Result2 = matchIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
      expect(ipv6Result2.is_flagged).toBe(false);
      expect(ipv6Result2.matched_agency).toBeNull();
    });

    it('Malformed IPv4 strings handle gracefully', () => {
      const inputs = [
        '127.0.0.1.2',  // Too many octets
        'abc.def.ghi.jkl', // Alphabetic
        '256.0.0.1',    // Out of range octet
        '12.34.56',     // Too few octets
        '-1.0.0.1',     // Negative octet
        '1.2.3.0x4',    // Hex octet
      ];
      for (const input of inputs) {
        const result = matchIP(input);
        expect(result.is_flagged).toBe(false);
        expect(result.matched_agency).toBeNull();
      }
    });

    it('Decimal leading zeros are parsed in base 10', () => {
      // 166.82.005.005 should parse as 166.82.5.5 and match VITA Block 1
      const result = matchIP('166.82.005.005');
      expect(result.is_flagged).toBe(true);
      expect(result.matched_agency).toBe('Commonwealth of Virginia VITA Block 1');
    });

    it('Hex representations are rejected by ipToLong', () => {
      // Hex IPs like 0x7f.0.0.1 should return -1 and fail to match
      expect(ipToLong('0x7f.0.0.1')).toBe(-1);
    });
  });

  // ==========================================
  // 2. Proxy Validation Bypass and Socket Errors
  // ==========================================
  describe('Proxy Interception and Socket Failure Tests', () => {
    it('Leading comma in X-Forwarded-For does not cause flagging bypass', async () => {
      const req = new Request('http://localhost/', {
        headers: {
          'X-Forwarded-For': ', 166.82.5.5'
        }
      });
      const resp = await handleRequest(req);
      const data = await resp.json();
      
      expect(data.logged.ip_address).toBe('166.82.5.5');
      expect(data.logged.is_flagged).toBe(true);
      expect(data.logged.matched_agency).toBe('Commonwealth of Virginia VITA Block 1');
    });

    it('Extremely large payloads cause silent drops (EMSGSIZE)', async () => {
      // Start telemetry daemon
      daemonSocket = startDaemon(TEST_PORT, '127.0.0.1');
      await new Promise<void>((resolve) => {
        try {
          if (daemonSocket && daemonSocket.address()) {
            resolve();
            return;
          }
        } catch {}
        daemonSocket!.once('listening', resolve);
      });

      // Construct request with huge URL path to exceed UDP size limit (e.g. 100,000 bytes)
      const massivePath = '/' + 'A'.repeat(100000);
      const req = new Request(`http://localhost${massivePath}`, {
        headers: {
          'X-Mock-IP': '8.8.8.8'
        }
      });

      // The proxy handles the request, attempts UDP transmission, and returns 200 OK
      const resp = await handleRequest(req);
      expect(resp.status).toBe(200);

      // Wait to see if any log is written
      const logs = await waitForLogs(1, 1000);
      console.warn('DEBUG LARGE PAYLOAD LOGS:', JSON.stringify(logs, null, 2));
      // Filter logs by pathname starting with '/AAAA' to ignore leftover logs from other tests
      const massiveLogs = logs.filter((l: any) => l.pathname.startsWith('/AAAA'));
      expect(massiveLogs.length).toBe(0);
    });

    it('Invalid port in environment is handled without crashing', async () => {
      // Set TELEMETRY_PORT to invalid port (RangeError in dgram)
      process.env.TELEMETRY_PORT = '99999';

      const req = new Request('http://localhost/', {
        headers: {
          'X-Mock-IP': '8.8.8.8'
        }
      });

      // The proxy handles the request, catches the RangeError, and returns 200 OK
      const resp = await handleRequest(req);
      expect(resp.status).toBe(200);
    });
  });

  // ==========================================
  // 3. Telemetry Daemon Validation & Concurrency
  // ==========================================
  describe('Telemetry Daemon Validation and Concurrency', () => {
    it('Daemon validates and filters out invalid structures and rejects XSS strings in IP address', async () => {
      daemonSocket = startDaemon(TEST_PORT, '127.0.0.1');
      await new Promise<void>((resolve) => {
        try {
          if (daemonSocket && daemonSocket.address()) {
            resolve();
            return;
          }
        } catch {}
        daemonSocket!.once('listening', resolve);
      });

      const client = dgram.createSocket('udp4');
      
      // XSS payload in ip_address (daemon rejects since it is not a valid IP address)
      const payload = {
        timestamp: new Date().toISOString(),
        ip_address: "<script>alert('XSS')</script>",
        pathname: '/xss-test',
        user_agent: 'AdversarialUA',
        is_flagged: false,
        matched_agency: null
      };

      const packet = Buffer.from(JSON.stringify(payload));
      
      await new Promise<void>((resolve, reject) => {
        client.send(packet, 0, packet.length, TEST_PORT, '127.0.0.1', (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      const logs = await waitForLogs(1, 500);
      client.close();

      expect(logs.length).toBe(0);
    });

    it('Daemon crashes and calls process.exit(0) when UDP socket gets error', async () => {
      daemonSocket = startDaemon(TEST_PORT, '127.0.0.1');
      await new Promise<void>((resolve) => {
        try {
          if (daemonSocket && daemonSocket.address()) {
            resolve();
            return;
          }
        } catch {}
        daemonSocket!.once('listening', resolve);
      });

      // Emit error on server socket
      daemonSocket!.emit('error', new Error('Mock socket error'));

      // Wait for process.exit to be called
      await new Promise<void>((resolve) => {
        const check = () => {
          if (exitSpy.mock.calls.length > 0) resolve();
          else setTimeout(check, 20);
        };
        check();
      });

      expect(exitSpy).toHaveBeenCalledWith(0);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Socket error: Mock socket error'));
    });

    it('High concurrency packets do not crash the daemon', async () => {
      daemonSocket = startDaemon(TEST_PORT, '127.0.0.1');
      await new Promise<void>((resolve) => {
        try {
          if (daemonSocket && daemonSocket.address()) {
            resolve();
            return;
          }
        } catch {}
        daemonSocket!.once('listening', resolve);
      });

      const client = dgram.createSocket('udp4');
      const count = 50;
      const promises: Promise<void>[] = [];

      for (let i = 0; i < count; i++) {
        const payload = {
          timestamp: new Date().toISOString(),
          ip_address: '1.2.3.4',
          pathname: `/concurrent-${i}`,
          user_agent: 'AdversarialConcurrencyUA',
          is_flagged: false,
          matched_agency: null
        };
        const packet = Buffer.from(JSON.stringify(payload));
        promises.push(new Promise<void>((resolve) => {
          client.send(packet, 0, packet.length, TEST_PORT, '127.0.0.1', () => resolve());
        }));
      }

      await Promise.all(promises);
      const logs = await waitForLogs(count, 2000);
      client.close();

      // Ensure daemon successfully logged all packets
      expect(logs.length).toBe(count);
    });
  });
});
