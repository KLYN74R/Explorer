import { hashData } from '@/helpers';

describe('blake3 hash', () => {
  test('returns a 64-character long hash', async () => {
    const inputString = 'Hello, world!';
    const result = await hashData(inputString);
    expect(result.length).toBe(64);
  });
});