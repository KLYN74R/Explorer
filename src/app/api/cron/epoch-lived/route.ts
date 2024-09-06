import type { NextRequest } from 'next/server';
import { kv } from '@vercel/kv';
import api from '@/helpers/api';
import { checkAuthorization } from '../auth';
import { API_ROUTES, KV } from '@/constants';
import { ChainInfo } from '@/definitions';

export async function GET(request: NextRequest) {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] [INFO] CRON job triggered`);

  const authResponse = checkAuthorization(request, timestamp);
  if (authResponse) {
    return authResponse; // 401
  }

  try {
    console.log(`[${timestamp}] [INFO] Fetching chain info data...`);
    const chainInfoData = await api.get<ChainInfo>(API_ROUTES.CHAIN.INFO);

    console.log(`[${timestamp}] [INFO] Saving chain info data to KV storage...`);
    await kv.hset(KV.HASHES.EPOCH_LIVED, {
      [KV.EPOCH_LIVED_KEYS.CHAIN_INFO]: JSON.stringify(chainInfoData)
    });

    console.log(`[${timestamp}] [SUCCESS] Chain info data successfully saved to KV storage`);
    return Response.json({ success: true });

  } catch (error: any) {
    console.error(`[${timestamp}] [ERROR] Failed to complete CRON job: ${error.message}`);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}