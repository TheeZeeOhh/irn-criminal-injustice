import { expect, it } from 'vitest';
import { handleRequest } from '../../src/proxy';

it('should import handleRequest successfully', () => {
  expect(handleRequest).toBeDefined();
});
