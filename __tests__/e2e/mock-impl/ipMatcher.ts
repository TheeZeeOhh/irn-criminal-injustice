export const VIRGINIA_AGENCIES = [
  { cidr: '166.82.0.0/16', agency: 'Commonwealth of Virginia VITA Block 1' },
  { cidr: '159.161.0.0/16', agency: 'Commonwealth of Virginia VITA Block 2' },
  { cidr: '198.139.0.0/16', agency: 'Commonwealth of Virginia VITA Block 3' },
  { cidr: '199.111.0.0/16', agency: 'Commonwealth of Virginia VITA Block 4' },
  { cidr: '208.73.208.0/21', agency: 'Richmond City' },
  { cidr: '198.244.100.0/24', agency: 'Fairfax County' }
];

export interface MatchResult {
  is_flagged: boolean;
  matched_agency: string | null;
}

export function ipToLong(ip: string): number {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return -1;
  let num = 0;
  for (let i = 0; i < 4; i++) {
    const part = parseInt(parts[i], 10);
    if (isNaN(part) || part < 0 || part > 255) return -1;
    num = (num << 8) + part;
  }
  return num >>> 0;
}

export function matchCIDR(ip: string, cidr: string): boolean {
  const [range, bitsStr] = cidr.split('/');
  const bits = parseInt(bitsStr, 10);
  
  const ipLong = ipToLong(ip);
  const rangeLong = ipToLong(range);
  
  if (ipLong === -1 || rangeLong === -1) return false;
  if (bits < 0 || bits > 32) return false;
  
  if (bits === 0) return true;
  const mask = (~((1 << (32 - bits)) - 1)) >>> 0;
  return (ipLong & mask) === (rangeLong & mask);
}

export function matchIP(ipAddress: string): MatchResult {
  if (typeof ipAddress !== 'string') {
    return { is_flagged: false, matched_agency: null };
  }
  
  const trimmed = ipAddress.trim();
  
  for (const item of VIRGINIA_AGENCIES) {
    try {
      if (matchCIDR(trimmed, item.cidr)) {
        return { is_flagged: true, matched_agency: item.agency };
      }
    } catch {
      // Gracefully catch matcher exceptions
    }
  }
  
  return { is_flagged: false, matched_agency: null };
}
