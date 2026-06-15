import { describe, it, expect } from 'vitest';
import { matchIp, matchIP, ipToLong, matchCIDR } from '../src/lib/ipMatcher';

describe('ipToLong utility', () => {
  it('should correctly convert standard IPv4 addresses to 32-bit unsigned integers', () => {
    expect(ipToLong('0.0.0.0')).toBe(0);
    expect(ipToLong('127.0.0.1')).toBe(2130706433);
    expect(ipToLong('255.255.255.255')).toBe(4294967295);
    expect(ipToLong('192.168.1.1')).toBe(3232235777);
  });

  it('should trim whitespace from IP addresses before conversion', () => {
    expect(ipToLong('   127.0.0.1   ')).toBe(2130706433);
    expect(ipToLong('\t10.0.0.1\n')).toBe(167772161);
  });

  it('should return -1 for invalid IP formats', () => {
    expect(ipToLong('invalid')).toBe(-1);
    expect(ipToLong('1.2.3')).toBe(-1);
    expect(ipToLong('1.2.3.4.5')).toBe(-1);
    expect(ipToLong('256.0.0.0')).toBe(-1);
    expect(ipToLong('-1.0.0.0')).toBe(-1);
    expect(ipToLong('a.b.c.d')).toBe(-1);
    expect(ipToLong('')).toBe(-1);
    expect(ipToLong(null as unknown as string)).toBe(-1);
    expect(ipToLong(undefined as unknown as string)).toBe(-1);
  });
});

describe('matchCIDR utility', () => {
  it('should correctly match IPs within CIDR range', () => {
    expect(matchCIDR('192.168.1.50', '192.168.1.0/24')).toBe(true);
    expect(matchCIDR('10.0.0.1', '10.0.0.1/32')).toBe(true);
    expect(matchCIDR('10.0.0.2', '10.0.0.1/32')).toBe(false);
    expect(matchCIDR('192.168.2.50', '192.168.1.0/24')).toBe(false);
  });

  it('should handle /0 representing any IPv4 address', () => {
    expect(matchCIDR('1.2.3.4', '0.0.0.0/0')).toBe(true);
    expect(matchCIDR('192.168.1.1', '0.0.0.0/0')).toBe(true);
  });

  it('should return false for invalid IP or CIDR range formats', () => {
    expect(matchCIDR('invalid_ip', '192.168.1.0/24')).toBe(false);
    expect(matchCIDR('192.168.1.1', 'invalid_cidr')).toBe(false);
    expect(matchCIDR('192.168.1.1', '192.168.1.0/abc')).toBe(false);
    expect(matchCIDR('192.168.1.1', '192.168.1.0/33')).toBe(false);
    expect(matchCIDR('192.168.1.1', '192.168.1.0/-1')).toBe(false);
    expect(matchCIDR(null as unknown as string, '192.168.1.0/24')).toBe(false);
    expect(matchCIDR('192.168.1.1', null as unknown as string)).toBe(false);
  });
});

describe('matchIp / matchIP functionality', () => {
  describe('VITA Block 1 (166.82.0.0/16)', () => {
    it('should match IPs in range', () => {
      const result = matchIp('166.82.50.100');
      expect(result.isFlagged).toBe(true);
      expect(result.matchedAgency).toBe('Commonwealth of Virginia VITA Block 1');
      expect(result.is_flagged).toBe(true);
      expect(result.matched_agency).toBe('Commonwealth of Virginia VITA Block 1');
    });

    it('should respect boundaries', () => {
      // Lower limit
      expect(matchIp('166.82.0.0').isFlagged).toBe(true);
      expect(matchIp('166.81.255.255').isFlagged).toBe(false);

      // Upper limit
      expect(matchIp('166.82.255.255').isFlagged).toBe(true);
      expect(matchIp('166.83.0.0').isFlagged).toBe(false);
    });
  });

  describe('VITA Block 2 (159.161.0.0/16)', () => {
    it('should match IPs in range', () => {
      expect(matchIp('159.161.4.2').isFlagged).toBe(true);
      expect(matchIp('159.161.4.2').matchedAgency).toBe('Commonwealth of Virginia VITA Block 2');
    });

    it('should respect boundaries', () => {
      expect(matchIp('159.161.0.0').isFlagged).toBe(true);
      expect(matchIp('159.160.255.255').isFlagged).toBe(false);
      expect(matchIp('159.161.255.255').isFlagged).toBe(true);
      expect(matchIp('159.162.0.0').isFlagged).toBe(false);
    });
  });

  describe('VITA Block 3 (198.139.0.0/16)', () => {
    it('should match IPs in range', () => {
      expect(matchIp('198.139.1.1').isFlagged).toBe(true);
      expect(matchIp('198.139.1.1').matchedAgency).toBe('Commonwealth of Virginia VITA Block 3');
    });

    it('should respect boundaries', () => {
      expect(matchIp('198.139.0.0').isFlagged).toBe(true);
      expect(matchIp('198.138.255.255').isFlagged).toBe(false);
      expect(matchIp('198.139.255.255').isFlagged).toBe(true);
      expect(matchIp('198.140.0.0').isFlagged).toBe(false);
    });
  });

  describe('VITA Block 4 (199.111.0.0/16)', () => {
    it('should match IPs in range', () => {
      expect(matchIp('199.111.99.1').isFlagged).toBe(true);
      expect(matchIp('199.111.99.1').matchedAgency).toBe('Commonwealth of Virginia VITA Block 4');
    });

    it('should respect boundaries', () => {
      expect(matchIp('199.111.0.0').isFlagged).toBe(true);
      expect(matchIp('199.110.255.255').isFlagged).toBe(false);
      expect(matchIp('199.111.255.255').isFlagged).toBe(true);
      expect(matchIp('199.112.0.0').isFlagged).toBe(false);
    });
  });

  describe('Richmond City (208.73.208.0/21)', () => {
    it('should match IPs in range', () => {
      expect(matchIp('208.73.210.5').isFlagged).toBe(true);
      expect(matchIp('208.73.210.5').matchedAgency).toBe('Richmond City');
    });

    it('should respect boundaries', () => {
      // Lower limit
      expect(matchIp('208.73.208.0').isFlagged).toBe(true);
      expect(matchIp('208.73.207.255').isFlagged).toBe(false);

      // Upper limit: /21 range is 8 /24 blocks, from 208.0 to 215.255
      expect(matchIp('208.73.215.255').isFlagged).toBe(true);
      expect(matchIp('208.73.216.0').isFlagged).toBe(false);
    });
  });

  describe('Fairfax County (198.244.0.0/16)', () => {
    it('should match IPs in range', () => {
      expect(matchIp('198.244.100.1').isFlagged).toBe(true);
      expect(matchIp('198.244.100.1').matchedAgency).toBe('Fairfax County');
    });

    it('should respect boundaries', () => {
      expect(matchIp('198.244.0.0').isFlagged).toBe(true);
      expect(matchIp('198.243.255.255').isFlagged).toBe(false);
      expect(matchIp('198.244.255.255').isFlagged).toBe(true);
      expect(matchIp('198.245.0.0').isFlagged).toBe(false);
    });
  });

  describe('Edge cases, spaces, invalid formats', () => {
    it('should handle whitespace padded IPs correctly by trimming', () => {
      const result = matchIp('   166.82.5.5   ');
      expect(result.isFlagged).toBe(true);
      expect(result.matchedAgency).toBe('Commonwealth of Virginia VITA Block 1');
    });

    it('should gracefully handle empty or invalid format inputs', () => {
      expect(matchIp('').isFlagged).toBe(false);
      expect(matchIp('   ').isFlagged).toBe(false);
      expect(matchIp('invalid_ip').isFlagged).toBe(false);
      expect(matchIp('300.400.500.600').isFlagged).toBe(false);
      expect(matchIp('1.2.3.4.5').isFlagged).toBe(false);
      expect(matchIp(null as unknown as string).isFlagged).toBe(false);
      expect(matchIp(undefined as unknown as string).isFlagged).toBe(false);
    });

    it('should handle IPv6/localhost addresses safely without crashing', () => {
      expect(matchIp('::1').isFlagged).toBe(false);
      expect(matchIp('fe80::1').isFlagged).toBe(false);
      expect(matchIp('2001:0db8:85a3:0000:0000:8a2e:0370:7334').isFlagged).toBe(false);
    });

    it('should support matchIP snake_case compatibility alias', () => {
      const result = matchIP('166.82.5.5');
      expect(result.is_flagged).toBe(true);
      expect(result.matched_agency).toBe('Commonwealth of Virginia VITA Block 1');
    });
  });
});
