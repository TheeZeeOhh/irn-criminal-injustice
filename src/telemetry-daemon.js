/* eslint-disable @typescript-eslint/no-require-imports */
const dgram = require('dgram');
const fs = require('fs');
const path = require('path');
const net = require('net');

const logPath = path.join(__dirname, '..', 'telemetry.jsonl');

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload is not a JSON object');
  }
  const { timestamp, ip_address, pathname, user_agent, is_flagged, matched_agency } = payload;
  
  if (typeof timestamp !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/.test(timestamp) || isNaN(Date.parse(timestamp))) {
    throw new Error(`Invalid or missing timestamp: ${String(timestamp)}`);
  }
  
  if (typeof ip_address !== 'string' || net.isIP(ip_address) === 0) {
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

let server;
let isListening = false;
let isClosed = false;
const isMainModule = require.main === module || (typeof process !== 'undefined' && process.env.TELEMETRY_TEST_MAIN === 'true');

function startDaemon(port = process.env.TELEMETRY_PORT ? parseInt(process.env.TELEMETRY_PORT, 10) : 51412, host = '127.0.0.1') {
  isListening = false;
  isClosed = false;
  const currentLogPath = process.env.TELEMETRY_LOG_FILE || logPath;

  // Ensure log directory exists
  const dir = path.dirname(currentLogPath);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      console.error(`Failed to create log directory: ${err.message}`);
    }
  }

  // Ensure log file exists
  if (!fs.existsSync(currentLogPath)) {
    try {
      fs.writeFileSync(currentLogPath, '', 'utf8');
    } catch (err) {
      console.error(`Failed to create telemetry log file: ${err.message}`);
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
      console.error(`Error processing telemetry packet: ${err.message}`);
    }
  });

  server.on('listening', () => {
    isListening = true;
    const address = server.address();
    console.log(`Telemetry daemon listening on ${address.address}:${address.port}`);
  });

  server.on('error', (err) => {
    console.error(`Socket error: ${err.message}`);
    shutdown();
  });

  server.bind(port, host);
  return server;
}

const shutdown = () => {
  if (isClosed) return;
  isClosed = true;
  console.log('Shutting down telemetry daemon...');
  if (server && isListening) {
    try {
      server.close(() => {
        console.log('Telemetry daemon UDP socket closed.');
        isListening = false;
        if (isMainModule) {
          process.exit(0);
        }
      });
      if (isMainModule) {
        setTimeout(() => {
          console.log('Forcing exit.');
          process.exit(0);
        }, 1000).unref();
      }
    } catch (err) {
      console.error(`Error closing UDP socket: ${err.message}`);
      isListening = false;
      if (isMainModule) {
        process.exit(1);
      }
    }
  } else {
    isListening = false;
    if (isMainModule) {
      process.exit(0);
    }
  }
};

if (isMainModule) {
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

// If this file is run directly (not required/imported)
if (require.main === module) {
  startDaemon();
}

module.exports = {
  startDaemon,
  shutdown,
  validatePayload,
  logPath
};
