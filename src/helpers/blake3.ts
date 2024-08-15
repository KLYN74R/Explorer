import { createBLAKE3 } from 'hash-wasm';

export async function hashData(str: string) {
  const hash = await createBLAKE3();
  return hash.update(str).digest('hex');
}