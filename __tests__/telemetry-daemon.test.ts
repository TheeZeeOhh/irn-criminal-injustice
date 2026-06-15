import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as dgram from 'dgram';
// @ts-expect-error: importing js file from ts test file
import { validatePayload, startDaemon, logPath } from '../src/telemetry-daemon.js';

describe('Telemetry Daemon Unit Tests', () => {
  it('should validate correct payload', () => {
    const valid = {
      timestamp: '2026-06-13T22:50:55Z',
      ip_address: '127.0.0.1',
      pathname: '/about',
      user_agent: 'Mozilla/5.0',
      is_flagged: false,
      matched_agency: null
    };
    expect(validatePayload(valid)).toEqual(valid);
    
    const validWithAgency = {
      timestamp: '2026-06-13T22:50:55.123-04:00',
      ip_address: '192.168.1.1',
      pathname: '/campaigns',
      user_agent: 'Safari',
      is_flagged: true,
      matched_agency: 'FBI'
    };
    expect(validatePayload(validWithAgency)).toEqual(validWithAgency);
  });

  it('should reject invalid payload structure', () => {
    expect(() => validatePayload(null)).toThrow();
    expect(() => validatePayload({})).toThrow();
  });

  it('should reject invalid timestamp', () => {
    const base = {
      timestamp: '2026-06-13',
      ip_address: '127.0.0.1',
      pathname: '/about',
      user_agent: 'Mozilla/5.0',
      is_flagged: false,
      matched_agency: null
    };
    expect(() => validatePayload(base)).toThrow();
    
    expect(() => validatePayload({ ...base, timestamp: 123456 })).toThrow();
    expect(() => validatePayload({ ...base, timestamp: 'invalid-date' })).toThrow();
  });

  it('should reject invalid ip_address', () => {
    const base = {
      timestamp: '2026-06-13T22:50:55Z',
      ip_address: 123,
      pathname: '/about',
      user_agent: 'Mozilla/5.0',
      is_flagged: false,
      matched_agency: null
    };
    expect(() => validatePayload(base)).toThrow();
  });

  it('should reject invalid pathname', () => {
    const base = {
      timestamp: '2026-06-13T22:50:55Z',
      ip_address: '127.0.0.1',
      pathname: {},
      user_agent: 'Mozilla/5.0',
      is_flagged: false,
      matched_agency: null
    };
    expect(() => validatePayload(base)).toThrow();
  });

  it('should reject invalid user_agent', () => {
    const base = {
      timestamp: '2026-06-13T22:50:55Z',
      ip_address: '127.0.0.1',
      pathname: '/about',
      user_agent: true,
      is_flagged: false,
      matched_agency: null
    };
    expect(() => validatePayload(base)).toThrow();
  });

  it('should reject invalid is_flagged', () => {
    const base = {
      timestamp: '2026-06-13T22:50:55Z',
      ip_address: '127.0.0.1',
      pathname: '/about',
      user_agent: 'Mozilla/5.0',
      is_flagged: 'false',
      matched_agency: null
    };
    expect(() => validatePayload(base)).toThrow();
  });

  it('should reject invalid matched_agency', () => {
    const base = {
      timestamp: '2026-06-13T22:50:55Z',
      ip_address: '127.0.0.1',
      pathname: '/about',
      user_agent: 'Mozilla/5.0',
      is_flagged: false,
      matched_agency: 123
    };
    expect(() => validatePayload(base)).toThrow();
  });
});

describe('Telemetry Daemon Integration', () => {
  let testServer: dgram.Socket;
  let backupExists = false;
  let backupContent = '';

  beforeAll(async () => {
    if (fs.existsSync(logPath)) {
      backupExists = true;
      backupContent = fs.readFileSync(logPath, 'utf8');
    }
    // Clear the log file for tests
    fs.writeFileSync(logPath, '', 'utf8');

    testServer = startDaemon(51415, '127.0.0.1');
    // Wait slightly for socket to bind
    await new Promise<void>((resolve) => {
      try {
        if (testServer.address()) {
          resolve();
        } else {
          testServer.once('listening', resolve);
        }
      } catch {
        testServer.once('listening', resolve);
      }
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      testServer.close(() => {
        resolve();
      });
    });

    // Restore original log file
    if (backupExists) {
      fs.writeFileSync(logPath, backupContent, 'utf8');
    } else {
      if (fs.existsSync(logPath)) {
        fs.unlinkSync(logPath);
      }
    }
  });

  it('should process valid UDP datagram packets and ignore invalid ones', async () => {
    const client = dgram.createSocket('udp4');
    
    const validPacket = {
      timestamp: '2026-06-13T22:50:55Z',
      ip_address: '127.0.0.1',
      pathname: '/know-your-rights',
      user_agent: 'Mozilla/5.0 Test',
      is_flagged: true,
      matched_agency: 'NSA'
    };

    const invalidPacket = {
      timestamp: 'invalid-time',
      ip_address: '127.0.0.1'
    };

    const malformedJson = '{invalid_json';

    const sendPacket = (data: string) => {
      return new Promise<void>((resolve, reject) => {
        const buf = Buffer.from(data);
        client.send(buf, 0, buf.length, 51415, '127.0.0.1', (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    };

    // Send valid packet
    await sendPacket(JSON.stringify(validPacket));
    
    // Send invalid schema packet
    await sendPacket(JSON.stringify(invalidPacket));

    // Send malformed JSON
    await sendPacket(malformedJson);

    // Close client socket
    client.close();

    // Wait for file writes to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Read the log file
    const content = fs.readFileSync(logPath, 'utf8');
    const lines = content.trim().split('\n').filter(Boolean);

    expect(lines.length).toBe(1);
    const logObj = JSON.parse(lines[0]);
    expect(logObj).toEqual(validPacket);
  });
});
