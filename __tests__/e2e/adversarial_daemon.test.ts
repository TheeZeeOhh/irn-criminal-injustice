import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as dgram from 'dgram';
import { handleRequest } from '../../src/proxy';
import { matchIP, ipToLong, matchCIDR } from '../../src/lib/ipMatcher';

const TEST_PORT = 51414;
const TEST_LOG_FILE = path.resolve(process.cwd(), 'telemetry-adversarial-test.jsonl');

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

describe('Adversarial Telemetry & Daemon Test Suite', () => {
  let originalPort: string | undefined;
  let originalLogFile: string | undefined;
  let originalTestMain: string | undefined;
  let startDaemon: any;
  let shutdown: any;
  let validatePayload: any;
  let daemonSocket: dgram.Socket | null = null;
  let consoleErrorSpy: any;
  let consoleLogSpy: any;

  beforeEach(async () => {
    originalPort = process.env.TELEMETRY_PORT;
    originalLogFile = process.env.TELEMETRY_LOG_FILE;
    originalTestMain = process.env.TELEMETRY_TEST_MAIN;

    // Reset module registry to reload daemon fresh for each test (resets module-level state)
    vi.resetModules();
    
    // Set env variables
    process.env.TELEMETRY_PORT = String(TEST_PORT);
    process.env.TELEMETRY_LOG_FILE = TEST_LOG_FILE;
    process.env.TELEMETRY_TEST_MAIN = 'true';

    // Dynamically load the daemon module
    // @ts-ignore
    const daemonModule = await import('../../src/telemetry-daemon.js');
    startDaemon = daemonModule.startDaemon;
    shutdown = daemonModule.shutdown;
    validatePayload = daemonModule.validatePayload;

    clearLogFile();

    // Spies to suppress/verify logs
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
  // Section 1: IP Matcher (ipMatcher.ts) Tests
  // ==========================================
  describe('IP Matcher Unit Tests', () => {
    it('ipToLong - handles non-string and malformed inputs gracefully', () => {
      // Non-string arguments
      expect(ipToLong(null as any)).toBe(-1);
      expect(ipToLong(undefined as any)).toBe(-1);
      expect(ipToLong(12345 as any)).toBe(-1);
      expect(ipToLong({} as any)).toBe(-1);
      expect(ipToLong([] as any)).toBe(-1);

      // Malformed IP strings
      expect(ipToLong('')).toBe(-1);
      expect(ipToLong('127')).toBe(-1);
      expect(ipToLong('127.0')).toBe(-1);
      expect(ipToLong('127.0.0')).toBe(-1);
      expect(ipToLong('127.0.0.1.2')).toBe(-1);
      expect(ipToLong('a.b.c.d')).toBe(-1);
      expect(ipToLong('127.0.0.abc')).toBe(-1);
      expect(ipToLong('127.0.0.1a')).toBe(-1);
      expect(ipToLong('127.0.0.256')).toBe(-1);
      expect(ipToLong('256.0.0.1')).toBe(-1);
      expect(ipToLong('127.0.0.-1')).toBe(-1);
      
      // Trim checks
      expect(ipToLong('  127.0.0.1  ')).toBe(2130706433);
      // Overflow checks
      expect(ipToLong('127.0.0.99999999999999999999999999')).toBe(-1);
    });

    it('matchCIDR - handles malformed CIDRs and types gracefully', () => {
      // Non-string arguments
      expect(matchCIDR(null as any, '192.168.1.0/24')).toBe(false);
      expect(matchCIDR('192.168.1.1', null as any)).toBe(false);

      // Malformed CIDR strings
      expect(matchCIDR('192.168.1.1', '192.168.1.0')).toBe(false);
      expect(matchCIDR('192.168.1.1', '192.168.1.0/')).toBe(false);
      expect(matchCIDR('192.168.1.1', '192.168.1.0/abc')).toBe(false);
      expect(matchCIDR('192.168.1.1', '192.168.1.0/33')).toBe(false);
      expect(matchCIDR('192.168.1.1', '192.168.1.0/-1')).toBe(false);
      expect(matchCIDR('192.168.1.1', 'invalid/24')).toBe(false);

      // Boundary bits
      expect(matchCIDR('192.168.1.1', '192.168.1.1/32')).toBe(true);
      expect(matchCIDR('192.168.1.2', '192.168.1.1/32')).toBe(false);
      expect(matchCIDR('192.168.1.2', '192.168.1.0/31')).toBe(false); // 192.168.1.2 is outside the range [192.168.1.0, 192.168.1.1]
      expect(matchCIDR('192.168.1.2', '0.0.0.0/0')).toBe(true);
    });

    it('matchIP / matchIp - boundary limits and aliases', () => {
      // Test aliases
      expect(matchIP).toBe(matchIP);

      // Lower/upper boundaries of Richmond City: 208.73.208.0/21
      // Range: 208.73.208.0 to 208.73.215.255
      expect(matchIP('208.73.207.255').is_flagged).toBe(false);
      expect(matchIP('208.73.208.0').is_flagged).toBe(true);
      expect(matchIP('208.73.215.255').is_flagged).toBe(true);
      expect(matchIP('208.73.216.0').is_flagged).toBe(false);
    });
  });

  // ==========================================
  // Section 2: Request Proxy (proxy.ts) Tests
  // ==========================================
  describe('Proxy Header Interception & Parsing Tests', () => {
    it('X-Mock-IP case sensitivity', async () => {
      const casings = ['x-mock-ip', 'X-Mock-IP', 'X-MOCK-IP', 'x-mock-IP'];
      for (const casing of casings) {
        const req = new Request('http://localhost/', {
          headers: { [casing]: '166.82.1.1' }
        });
        const resp = await handleRequest(req);
        const data = await resp.json();
        expect(data.logged.ip_address).toBe('166.82.1.1');
        expect(data.logged.is_flagged).toBe(true);
        expect(data.logged.matched_agency).toBe('Commonwealth of Virginia VITA Block 1');
      }
    });

    it('X-Forwarded-For parsing edge cases (including bugs/gaps)', async () => {
      // 1. Whitespace padding
      const req1 = new Request('http://localhost/', {
        headers: { 'X-Forwarded-For': '  166.82.1.1  ' }
      });
      const data1 = await (await handleRequest(req1)).json();
      expect(data1.logged.ip_address).toBe('166.82.1.1');

      // 2. Multi-hop chain with trailing empty hops
      const req2 = new Request('http://localhost/', {
        headers: { 'X-Forwarded-For': '166.82.1.1, , ' }
      });
      const data2 = await (await handleRequest(req2)).json();
      expect(data2.logged.ip_address).toBe('166.82.1.1');

      // 3. Leading commas (Verifies that the proxy extracts '166.82.1.1' and successfully flags it as VITA Block 1)
      const req3 = new Request('http://localhost/', {
        headers: { 'X-Forwarded-For': ', 166.82.1.1' }
      });
      const data3 = await (await handleRequest(req3)).json();
      expect(data3.logged.ip_address).toBe('166.82.1.1');
      expect(data3.logged.is_flagged).toBe(true);
      expect(data3.logged.matched_agency).toBe('Commonwealth of Virginia VITA Block 1');
    });

    it('X-Real-IP override ignored', async () => {
      // Proxy only supports X-Mock-IP and X-Forwarded-For
      const req = new Request('http://localhost/', {
        headers: { 'X-Real-IP': '166.82.1.1' }
      });
      const data = await (await handleRequest(req)).json();
      expect(data.logged.ip_address).toBe('127.0.0.1');
    });

    it('Priority check: X-Mock-IP vs X-Forwarded-For', async () => {
      const req = new Request('http://localhost/', {
        headers: {
          'X-Mock-IP': '159.161.1.1', // Block 2
          'X-Forwarded-For': '166.82.1.1' // Block 1
        }
      });
      const data = await (await handleRequest(req)).json();
      expect(data.logged.ip_address).toBe('159.161.1.1');
      expect(data.logged.matched_agency).toBe('Commonwealth of Virginia VITA Block 2');
    });
  });

  // ==========================================
  // Section 3: Daemon Validation & Schema Tests
  // ==========================================
  describe('Daemon Validation Logic', () => {
    it('validatePayload - rejects null, non-objects, and missing/malformed fields', () => {
      // Null & Primitive values
      expect(() => validatePayload(null)).toThrow('Payload is not a JSON object');
      expect(() => validatePayload(undefined)).toThrow('Payload is not a JSON object');
      expect(() => validatePayload('string')).toThrow('Payload is not a JSON object');
      expect(() => validatePayload(123)).toThrow('Payload is not a JSON object');
      expect(() => validatePayload(true)).toThrow('Payload is not a JSON object');

      const validBase = {
        timestamp: '2026-06-14T05:57:00.000Z',
        ip_address: '127.0.0.1',
        pathname: '/',
        user_agent: 'Vitest',
        is_flagged: false,
        matched_agency: null
      };

      // Malformed timestamp
      expect(() => validatePayload({ ...validBase, timestamp: null })).toThrow('Invalid or missing timestamp');
      expect(() => validatePayload({ ...validBase, timestamp: 12345 })).toThrow('Invalid or missing timestamp');
      expect(() => validatePayload({ ...validBase, timestamp: '2026-06-14' })).toThrow('Invalid or missing timestamp');
      expect(() => validatePayload({ ...validBase, timestamp: 'not-a-date' })).toThrow('Invalid or missing timestamp');

      // Malformed ip_address
      expect(() => validatePayload({ ...validBase, ip_address: null })).toThrow('Invalid or missing ip_address');
      expect(() => validatePayload({ ...validBase, ip_address: 123 })).toThrow('Invalid or missing ip_address');
      expect(() => validatePayload({ ...validBase, ip_address: {} })).toThrow('Invalid or missing ip_address');
      expect(() => validatePayload({ ...validBase, ip_address: 'invalid-ip' })).toThrow('Invalid or missing ip_address');
      expect(() => validatePayload({ ...validBase, ip_address: '256.256.256.256' })).toThrow('Invalid or missing ip_address');
      expect(() => validatePayload({ ...validBase, ip_address: '::1' })).not.toThrow();

      // Malformed pathname
      expect(() => validatePayload({ ...validBase, pathname: null })).toThrow('Invalid or missing pathname');
      expect(() => validatePayload({ ...validBase, pathname: true })).toThrow('Invalid or missing pathname');

      // Malformed user_agent
      expect(() => validatePayload({ ...validBase, user_agent: null })).toThrow('Invalid or missing user_agent');

      // Malformed is_flagged
      expect(() => validatePayload({ ...validBase, is_flagged: null })).toThrow('Invalid or missing is_flagged');
      expect(() => validatePayload({ ...validBase, is_flagged: 'false' })).toThrow('Invalid or missing is_flagged');

      // Malformed matched_agency
      expect(() => validatePayload({ ...validBase, matched_agency: undefined })).toThrow('Invalid or missing matched_agency');
      expect(() => validatePayload({ ...validBase, matched_agency: 123 })).toThrow('Invalid or missing matched_agency');

      // Extra fields should be stripped
      const withExtra = { ...validBase, extra_field: 'should_be_removed' };
      const validated = validatePayload(withExtra);
      expect(validated).not.toHaveProperty('extra_field');
      expect(validated).toEqual(validBase);
    });
  });

  // ==========================================
  // Section 4: Daemon Signal Handling & Socket Error Tests
  // ==========================================
  describe('Daemon Signal Handling and Graceful Shutdown', () => {
    it('shutdown - immediately exits if socket is not listening', () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
      
      // Call shutdown directly when daemon is NOT initialized
      shutdown();

      expect(exitSpy).toHaveBeenCalledWith(0);
    });

    it('shutdown - closes server and exits with code 0 when listening', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
      
      daemonSocket = startDaemon(TEST_PORT, '127.0.0.1');

      // Wait for it to listen
      await new Promise<void>((resolve) => {
        try {
          if (daemonSocket && daemonSocket.address()) {
            resolve();
            return;
          }
        } catch {}
        daemonSocket!.once('listening', resolve);
      });

      // Call shutdown
      shutdown();

      // Wait for socket close callback to execute and call process.exit
      await new Promise<void>(resolve => {
        const check = () => {
          if (exitSpy.mock.calls.length > 0) resolve();
          else setTimeout(check, 10);
        };
        check();
      });

      expect(exitSpy).toHaveBeenCalledWith(0);
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Telemetry daemon UDP socket closed.'));
    });

    it('shutdown - exits with code 1 if server.close throws an error', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
      
      daemonSocket = startDaemon(TEST_PORT, '127.0.0.1');

      // Wait for listening
      await new Promise<void>((resolve) => {
        try {
          if (daemonSocket && daemonSocket.address()) {
            resolve();
            return;
          }
        } catch {}
        daemonSocket!.once('listening', resolve);
      });

      // Mock socket.close to throw
      vi.spyOn(daemonSocket!, 'close').mockImplementation(() => {
        throw new Error('Socket close failed');
      });

      shutdown();

      expect(exitSpy).toHaveBeenCalledWith(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error closing UDP socket: Socket close failed'));
    });

    it('shutdown - falls back to setTimeout force exit if close hangs', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
      
      daemonSocket = startDaemon(TEST_PORT, '127.0.0.1');

      // Wait for listening
      await new Promise<void>((resolve) => {
        try {
          if (daemonSocket && daemonSocket.address()) {
            resolve();
            return;
          }
        } catch {}
        daemonSocket!.once('listening', resolve);
      });

      // Mock socket.close to never call its callback (simulating a hang)
      vi.spyOn(daemonSocket!, 'close').mockImplementation((cb?: any) => {
        // do not call cb
        return daemonSocket!;
      });

      // Wait for the setTimeout fallback (1000ms) to trigger using a real timer delay
      shutdown();

      await new Promise(resolve => setTimeout(resolve, 1200));

      expect(exitSpy).toHaveBeenCalledWith(0);
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Forcing exit.'));
    });

    it('process signal listener - SIGINT triggers shutdown', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);

      // Trigger SIGINT event on process
      process.emit('SIGINT');

      expect(exitSpy).toHaveBeenCalledWith(0);
    });

    it('process signal listener - SIGTERM triggers shutdown', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);

      // Trigger SIGTERM event on process
      process.emit('SIGTERM');

      expect(exitSpy).toHaveBeenCalledWith(0);
    });

    it('socket error - triggers shutdown', async () => {
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
      
      daemonSocket = startDaemon(TEST_PORT, '127.0.0.1');

      // Emit error event
      daemonSocket.emit('error', new Error('Mock socket error'));

      expect(exitSpy).toHaveBeenCalledWith(0);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Socket error: Mock socket error'));
    });

    it('shutdown - when imported (not main module), closes server without calling process.exit', async () => {
      vi.resetModules();
      process.env.TELEMETRY_PORT = String(TEST_PORT);
      process.env.TELEMETRY_LOG_FILE = TEST_LOG_FILE;
      process.env.TELEMETRY_TEST_MAIN = 'false';

      // @ts-ignore
      const daemonModule = await import('../../src/telemetry-daemon.js');
      const testStartDaemon = daemonModule.startDaemon;
      const testShutdown = daemonModule.shutdown;

      const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);

      const testSocket = testStartDaemon(TEST_PORT, '127.0.0.1');

      // Wait for listening
      await new Promise<void>((resolve) => {
        try {
          if (testSocket && testSocket.address()) {
            resolve();
            return;
          }
        } catch {}
        testSocket.once('listening', resolve);
      });

      // Call shutdown
      testShutdown();

      // Wait for socket to close
      await new Promise<void>(resolve => {
        testSocket.once('close', resolve);
      });

      expect(exitSpy).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Telemetry daemon UDP socket closed.'));
    });
  });

  // ==========================================
  // Section 5: UDP Transmission and JSON Parsing in Daemon
  // ==========================================
  describe('UDP Transmission & JSON Parsing', () => {
    beforeEach(async () => {
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
    });

    it('daemon ignores malformed JSON on UDP socket', async () => {
      const client = dgram.createSocket('udp4');
      const badData = Buffer.from('{invalid-json');

      client.send(badData, 0, badData.length, TEST_PORT, '127.0.0.1');
      
      // Wait for potential processing
      await new Promise(resolve => setTimeout(resolve, 150));
      client.close();

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error processing telemetry packet:'));
      expect(readLogLines().length).toBe(0);
    });

    it('daemon filters out extra fields from valid UDP packets', async () => {
      const client = dgram.createSocket('udp4');
      
      const payload = {
        timestamp: '2026-06-14T05:57:00.000Z',
        ip_address: '166.82.1.1',
        pathname: '/test-path',
        user_agent: 'AdversarialUA',
        is_flagged: true,
        matched_agency: 'Commonwealth of Virginia VITA Block 1',
        malicious_key: 'should_not_exist_in_log'
      };

      const packet = Buffer.from(JSON.stringify(payload));
      client.send(packet, 0, packet.length, TEST_PORT, '127.0.0.1');

      const logs = await waitForLogs(1);
      client.close();

      expect(logs.length).toBe(1);
      expect(logs[0]).not.toHaveProperty('malicious_key');
      expect(logs[0].ip_address).toBe('166.82.1.1');
    });
  });
});
