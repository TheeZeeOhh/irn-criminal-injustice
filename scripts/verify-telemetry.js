/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { startDaemon } = require('../src/telemetry-daemon.js');

const TEST_PORT = 51413;
const TEST_LOG_FILE = path.resolve(__dirname, '..', 'telemetry-verify-test.jsonl');

// Configure environment
process.env.TELEMETRY_PORT = String(TEST_PORT);
process.env.TELEMETRY_LOG_FILE = TEST_LOG_FILE;

async function run() {
  console.log('--- Starting Telemetry Integration Verification ---');

  // Ensure clean state
  if (fs.existsSync(TEST_LOG_FILE)) {
    fs.unlinkSync(TEST_LOG_FILE);
  }

  const distTempPath = path.resolve(__dirname, '..', 'dist-temp');
  if (fs.existsSync(distTempPath)) {
    fs.rmSync(distTempPath, { recursive: true, force: true });
  }

  // Compile TS files on the fly
  console.log('Compiling TypeScript files...');
  try {
    const { execSync } = require('child_process');
    execSync(
      'npx tsc src/proxy.ts --outDir dist-temp --module commonjs --target es2017 --moduleResolution node --esModuleInterop true --skipLibCheck true --resolveJsonModule true --noEmit false',
      {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '..')
      }
    );
    console.log('TypeScript compilation successful.');
  } catch (err) {
    console.error('TypeScript compilation failed:', err.message);
    process.exit(1);
  }

  let daemonSocket;
  try {
    // Start telemetry daemon
    console.log(`Starting telemetry daemon on port ${TEST_PORT}...`);
    daemonSocket = startDaemon(TEST_PORT, '127.0.0.1');

    // Wait for daemon to bind
    await new Promise((resolve) => {
      try {
        if (daemonSocket && daemonSocket.address()) {
          resolve();
        } else {
          daemonSocket.once('listening', resolve);
        }
      } catch {
        daemonSocket.once('listening', resolve);
      }
    });
    console.log('Telemetry daemon started.');

    // Dynamically load the compiled proxy version
    const proxyPath = path.resolve(__dirname, '..', 'dist-temp', 'proxy.js');
    if (!fs.existsSync(proxyPath)) {
      throw new Error(`Compiled proxy not found at ${proxyPath}. Run npm run build first.`);
    }

    console.log(`Loading proxy from ${proxyPath}...`);
    const proxyModule = require(proxyPath);
    const handleRequest = proxyModule.handleRequest || proxyModule.default;

    if (typeof handleRequest !== 'function') {
      throw new Error('handleRequest is not a function in proxy module');
    }

    // 1. Simulate request from standard IP
    console.log('Simulating request from standard IP (8.8.8.8)...');
    const reqStandard = new Request('http://localhost/search', {
      headers: {
        'X-Mock-IP': '8.8.8.8',
        'User-Agent': 'Mozilla/5.0 (Standard; IP Verification)'
      }
    });

    const resStandard = await handleRequest(reqStandard);
    console.log(`Response status: ${resStandard.status}`);
    
    // 2. Simulate request from target Virginia government IP
    console.log('Simulating request from Virginia government IP (166.82.5.5)...');
    const reqGov = new Request('http://localhost/criminal-injustice', {
      headers: {
        'X-Mock-IP': ' 166.82.5.5 ', // with whitespace to test trimming
        'User-Agent': 'Mozilla/5.0 (Virginia Gov; IP Verification)'
      }
    });

    const resGov = await handleRequest(reqGov);
    console.log(`Response status: ${resGov.status}`);

    // Wait for logs to be written
    console.log('Waiting for log entries to be written to disk...');
    const logs = await waitForLogs(2, 2000);

    if (logs.length < 2) {
      throw new Error(`Expected at least 2 log entries, but got ${logs.length}`);
    }

    console.log('Verifying log structures and content...');
    
    // Verify standard IP log entry
    const standardLog = logs.find(log => log.ip_address === '8.8.8.8');
    if (!standardLog) {
      throw new Error('Standard IP (8.8.8.8) log entry not found');
    }
    verifyLogStructure(standardLog);
    if (standardLog.is_flagged !== false) {
      throw new Error(`Expected is_flagged: false for standard IP, got: ${standardLog.is_flagged}`);
    }
    if (standardLog.matched_agency !== null) {
      throw new Error(`Expected matched_agency: null for standard IP, got: ${standardLog.matched_agency}`);
    }
    if (standardLog.pathname !== '/search') {
      throw new Error(`Expected pathname: '/search', got: ${standardLog.pathname}`);
    }
    if (standardLog.user_agent !== 'Mozilla/5.0 (Standard; IP Verification)') {
      throw new Error(`Expected user_agent: 'Mozilla/5.0 (Standard; IP Verification)', got: ${standardLog.user_agent}`);
    }
    console.log('✓ Standard IP verification passed.');

    // Verify Virginia gov IP log entry
    const govLog = logs.find(log => log.ip_address === '166.82.5.5');
    if (!govLog) {
      throw new Error('Virginia government IP (166.82.5.5) log entry not found');
    }
    verifyLogStructure(govLog);
    if (govLog.is_flagged !== true) {
      throw new Error(`Expected is_flagged: true for Virginia government IP, got: ${govLog.is_flagged}`);
    }
    if (govLog.matched_agency !== 'Commonwealth of Virginia VITA Block 1') {
      throw new Error(`Expected matched_agency: 'Commonwealth of Virginia VITA Block 1', got: ${govLog.matched_agency}`);
    }
    if (govLog.pathname !== '/criminal-injustice') {
      throw new Error(`Expected pathname: '/criminal-injustice', got: ${govLog.pathname}`);
    }
    if (govLog.user_agent !== 'Mozilla/5.0 (Virginia Gov; IP Verification)') {
      throw new Error(`Expected user_agent: 'Mozilla/5.0 (Virginia Gov; IP Verification)', got: ${govLog.user_agent}`);
    }
    console.log('✓ Virginia government IP verification passed.');

    console.log('--- Telemetry Integration Verification Succeeded! ---');
  } finally {
    // Clean up
    console.log('Cleaning up resources...');
    if (daemonSocket) {
      await new Promise((resolve) => {
        daemonSocket.close(() => {
          console.log('Telemetry daemon socket closed.');
          resolve();
        });
      });
    }

    if (fs.existsSync(TEST_LOG_FILE)) {
      fs.unlinkSync(TEST_LOG_FILE);
      console.log('Test log file cleaned up.');
    }

    if (fs.existsSync(distTempPath)) {
      fs.rmSync(distTempPath, { recursive: true, force: true });
      console.log('dist-temp directory cleaned up.');
    }
  }

  process.exit(0);
}

function verifyLogStructure(log) {
  const requiredFields = ['timestamp', 'ip_address', 'pathname', 'user_agent', 'is_flagged', 'matched_agency'];
  for (const field of requiredFields) {
    if (!(field in log)) {
      throw new Error(`Log entry missing required field: ${field}`);
    }
  }

  // Validate timestamp ISO-8601 structure
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/;
  if (!isoRegex.test(log.timestamp) || isNaN(Date.parse(log.timestamp))) {
    throw new Error(`Log entry has invalid timestamp: ${log.timestamp}`);
  }

  if (typeof log.ip_address !== 'string') throw new Error('ip_address must be a string');
  if (typeof log.pathname !== 'string') throw new Error('pathname must be a string');
  if (typeof log.user_agent !== 'string') throw new Error('user_agent must be a string');
  if (typeof log.is_flagged !== 'boolean') throw new Error('is_flagged must be a boolean');
  if (typeof log.matched_agency !== 'string' && log.matched_agency !== null) {
    throw new Error('matched_agency must be a string or null');
  }
}

async function waitForLogs(expectedCount, timeoutMs) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    if (fs.existsSync(TEST_LOG_FILE)) {
      try {
        const content = fs.readFileSync(TEST_LOG_FILE, 'utf8');
        const lines = content.trim().split('\n').filter(Boolean);
        if (lines.length >= expectedCount) {
          return lines.map(line => JSON.parse(line));
        }
      } catch {
        // file reading or JSON parsing might momentarily fail if writing is in progress
      }
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  if (fs.existsSync(TEST_LOG_FILE)) {
    const content = fs.readFileSync(TEST_LOG_FILE, 'utf8');
    return content.trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
  }
  return [];
}

run().catch(err => {
  console.error('Verification failed:', err.message);
  process.exit(1);
});
