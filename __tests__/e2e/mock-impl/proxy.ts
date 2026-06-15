import * as dgram from 'dgram';
import { matchIP } from './ipMatcher';

export interface TelemetryPayload {
  timestamp: string;
  ip_address: string;
  pathname: string;
  user_agent: string;
  is_flagged: boolean;
  matched_agency: string | null;
}

export function sendTelemetryPacket(payload: TelemetryPayload, port: number) {
  try {
    const client = dgram.createSocket('udp4');
    const msg = Buffer.from(JSON.stringify(payload));
    
    client.on('error', () => {
      // Gracefully catch any UDP errors to remain non-blocking
    });
    
    client.send(msg, 0, msg.length, port, '127.0.0.1', () => {
      try {
        client.close();
      } catch {}
    });
  } catch {
    // Catch-all to remain completely non-blocking
  }
}

export async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;
  
  // Extract client IP
  let ip = '127.0.0.1';
  
  const mockIp = req.headers.get('x-mock-ip');
  if (mockIp) {
    ip = mockIp;
  } else {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) {
      const parts = forwardedFor.split(',');
      ip = parts[0].trim();
    }
  }
  
  const userAgent = req.headers.get('user-agent') || '';
  
  // Perform IP matching
  const matchResult = matchIP(ip);
  
  const payload = {
    timestamp: new Date().toISOString(),
    ip_address: ip,
    pathname,
    user_agent: userAgent,
    is_flagged: matchResult.is_flagged,
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
