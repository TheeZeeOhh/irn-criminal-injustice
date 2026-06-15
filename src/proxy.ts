import * as dgram from 'dgram';
import { matchIP } from './lib/ipMatcher';

export interface TelemetryPayload {
  timestamp: string;
  ip_address: string;
  pathname: string;
  user_agent: string;
  is_flagged: boolean;
  matched_agency: string | null;
}

/**
 * Transmits the telemetry payload over UDP asynchronously and non-blocking.
 */
function sendTelemetryPacket(payload: TelemetryPayload, port: number): void {
  let client: dgram.Socket | null = null;
  try {
    client = dgram.createSocket('udp4');
    const msg = Buffer.from(JSON.stringify(payload));
    
    if (msg.length > 65507) {
      try {
        if (client) client.close();
      } catch {}
      return;
    }
    
    client.on('error', () => {
      try {
        if (client) {
          client.close();
          client = null;
        }
      } catch {
        // Ignore close errors to keep it non-blocking
      }
    });
    
    client.send(msg, 0, msg.length, port, '127.0.0.1', () => {
      try {
        if (client) {
          client.close();
          client = null;
        }
      } catch {
        // Ignore close errors to keep it non-blocking
      }
    });
  } catch {
    try {
      if (client) {
        client.close();
      }
    } catch {
      // Ignore close errors to keep it non-blocking
    }
  }
}

/**
 * Intercepts request data and forwards metadata to the telemetry server.
 */
export async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;
  
  // Extract client IP
  let ip = '127.0.0.1';
  
  const mockIp = req.headers.get('x-mock-ip') || req.headers.get('X-Mock-IP');
  if (mockIp) {
    ip = mockIp.trim();
  } else {
    const forwardedFor = req.headers.get('x-forwarded-for') || req.headers.get('X-Forwarded-For');
    if (forwardedFor) {
      const parts = forwardedFor.split(',').map(p => p.trim()).filter(p => p !== '');
      if (parts.length > 0) {
        ip = parts[0];
      }
    }
  }
  
  const userAgent = req.headers.get('user-agent') || req.headers.get('User-Agent') || '';
  
  // Perform IP matching
  const matchResult = matchIP(ip);
  
  const payload: TelemetryPayload = {
    timestamp: new Date().toISOString(),
    ip_address: ip,
    pathname,
    user_agent: userAgent,
    is_flagged: !!matchResult.is_flagged,
    matched_agency: matchResult.matched_agency
  };
  
  // Get port from env
  const port = parseInt(process.env.TELEMETRY_PORT || '51412', 10);
  
  // Fire-and-forget sending (asynchronous, non-blocking)
  sendTelemetryPacket(payload, port);
  
  return new Response(JSON.stringify({ success: true, logged: payload }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export default handleRequest;
