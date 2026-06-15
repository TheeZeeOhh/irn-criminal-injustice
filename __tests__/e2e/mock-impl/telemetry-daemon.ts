import * as dgram from 'dgram';
import * as fs from 'fs';
import * as path from 'path';

export const logPath = process.env.TELEMETRY_LOG_FILE || path.join(__dirname, '..', '..', '..', 'telemetry-test.jsonl');

export function validatePayload(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload is not a JSON object');
  }
  const { timestamp, ip_address, pathname, user_agent, is_flagged, matched_agency } = payload as Record<string, unknown>;
  
  if (typeof timestamp !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/.test(timestamp) || isNaN(Date.parse(timestamp))) {
    throw new Error(`Invalid or missing timestamp: ${String(timestamp)}`);
  }
  
  if (typeof ip_address !== 'string') {
    throw new Error(`Invalid or missing ip_address: ${String(ip_address)}`);
  }
  
  if (typeof pathname !== 'string') {
    throw new Error(`Invalid or missing pathname: ${String(pathname)}`);
  }
  
  if (typeof user_agent !== 'string') {
    throw new Error(`Invalid or missing user_agent: ${String(user_agent)}`);
  }
  
  if (typeof is_flagged !== 'boolean') {
    throw new Error(`Invalid or missing is_flagged: ${String(is_flagged)}`);
  }
  
  if (typeof matched_agency !== 'string' && matched_agency !== null) {
    throw new Error(`Invalid or missing matched_agency: ${String(matched_agency)}`);
  }
  
  return {
    timestamp,
    ip_address,
    pathname,
    user_agent,
    is_flagged,
    matched_agency
  };
}

let server: dgram.Socket | null = null;
let isListening = false;
let isClosed = false;

export function startDaemon(port: number = 51412, host: string = '127.0.0.1') {
  isClosed = false;
  isListening = false;
  
  const currentLogPath = process.env.TELEMETRY_LOG_FILE || logPath;
  
  // Ensure log directory exists
  const dir = path.dirname(currentLogPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Ensure log file exists
  if (!fs.existsSync(currentLogPath)) {
    try {
      fs.writeFileSync(currentLogPath, '', 'utf8');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Failed to create telemetry log file: ${msg}`);
      process.exit(1);
    }
  }

  server = dgram.createSocket('udp4');

  server.on('message', (msg) => {
    try {
      const data = msg.toString('utf8');
      const parsed = JSON.parse(data);
      const validated = validatePayload(parsed);
      const line = JSON.stringify(validated) + '\n';
      
      fs.appendFile(currentLogPath, line, 'utf8', (err) => {
        if (err) {
          console.error(`Failed to append to telemetry log file: ${err.message}`);
        }
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Error processing telemetry packet: ${msg}`);
    }
  });

  server.on('listening', () => {
    isListening = true;
  });

  server.on('error', (err) => {
    console.error(`Socket error: ${err.message}`);
    shutdown();
  });

  server.bind(port, host);
  return server;
}

export function shutdown() {
  if (isClosed) return;
  isClosed = true;
  if (server && isListening) {
    try {
      server.close();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Error closing UDP socket: ${msg}`);
    }
  }
}
