import { it } from 'vitest';
import { matchCIDR } from '../../src/lib/ipMatcher';
it('debug', () => {
  console.warn('1.1/32:', matchCIDR('192.168.1.1', '192.168.1.1/32'));
  console.warn('1.2/32:', matchCIDR('192.168.1.2', '192.168.1.1/32'));
  console.warn('1.2/31:', matchCIDR('192.168.1.2', '192.168.1.0/31'));
});
