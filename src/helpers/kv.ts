import { kv } from '@vercel/kv';
import { KV } from '@/constants';

export async function getFromKV<T>(kvKey: string): Promise<T | null> {
  try {
    const isEpochLived = kvKey.includes('epoch_lived');

    const result = await kv.hget(
      isEpochLived ? KV.HASHES.EPOCH_LIVED : KV.HASHES.SHORT_LIVED,
      kvKey
    );

    if (!result) {
      console.warn(`KV miss for key: ${kvKey}`);
      return null;
    }

    console.log(`KV hit for key: ${kvKey}`);
    return result as T;

  } catch (error: any) {
    console.error(`Error retrieving from KV for key: ${kvKey} - ${error.message}`);
    return null;
  }
}