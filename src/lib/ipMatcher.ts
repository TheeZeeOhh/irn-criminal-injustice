import virginiaIps from '../config/virginia-ips.json';

export interface MatchResult {
  isFlagged: boolean;
  matchedAgency: string | null;
  is_flagged: boolean;
  matched_agency: string | null;
}

/**
 * Converts an IPv4 address string to a 32-bit unsigned integer.
 * Returns -1 if the IP address is malformed or invalid.
 */
export function ipToLong(ip: string): number {
  if (typeof ip !== 'string') return -1;
  const trimmed = ip.trim();
  const parts = trimmed.split('.');
  if (parts.length !== 4) return -1;
  
  let num = 0;
  for (let i = 0; i < 4; i++) {
    const partStr = parts[i];
    if (!/^\d+$/.test(partStr)) return -1;
    const part = parseInt(partStr, 10);
    if (isNaN(part) || part < 0 || part > 255) return -1;
    num = (num << 8) + part;
  }
  return num >>> 0;
}

/**
 * Checks if a given IP matches an IPv4 CIDR pattern.
 * Handles edge cases like invalid formats, invalid IP/CIDR inputs, etc.
 */
export function matchCIDR(ip: string, cidr: string): boolean {
  if (typeof ip !== 'string' || typeof cidr !== 'string') return false;
  
  const parts = cidr.trim().split('/');
  if (parts.length !== 2) return false;
  
  const [range, bitsStr] = parts;
  if (!/^\d+$/.test(bitsStr)) return false;
  
  const bits = parseInt(bitsStr, 10);
  if (bits < 0 || bits > 32) return false;
  
  const ipLong = ipToLong(ip);
  const rangeLong = ipToLong(range);
  
  if (ipLong === -1 || rangeLong === -1) return false;
  
  const mask = bits === 0 ? 0 : (~((1 << (32 - bits)) - 1)) >>> 0;
  return (ipLong & mask) === (rangeLong & mask);
}

/**
 * Compares the given IP against all ranges configured in virginia-ips.json.
 * Returns matching status and agency name, supporting both camelCase and snake_case properties.
 */
export function matchIp(ip: string): MatchResult {
  if (typeof ip !== 'string') {
    return {
      isFlagged: false,
      matchedAgency: null,
      is_flagged: false,
      matched_agency: null
    };
  }

  const trimmed = ip.trim();

  for (const item of virginiaIps) {
    try {
      if (matchCIDR(trimmed, item.cidr)) {
        return {
          isFlagged: true,
          matchedAgency: item.agency,
          is_flagged: true,
          matched_agency: item.agency
        };
      }
    } catch {
      // Gracefully catch matcher exceptions and keep processing other ranges
    }
  }

  return {
    isFlagged: false,
    matchedAgency: null,
    is_flagged: false,
    matched_agency: null
  };
}

// Export matchIP alias for backwards/snake_case compatibility
export const matchIP = matchIp;
