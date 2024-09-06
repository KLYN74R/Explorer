import type { NextRequest } from 'next/server';
import { kv } from '@vercel/kv';
import api from '@/helpers/api';
import { checkAuthorization } from '../auth';
import { API_ROUTES, KV } from '@/constants';
import { BlockStats } from '@/definitions';
import {
  fetchCurrentEpoch,
  fetchRecentTotalBlocksAndTxs,
  fetchTotalBlocksAndTxsByEpoch
} from '@/data';

export async function GET(request: NextRequest) {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] [INFO] CRON job triggered`);

  const authResponse = checkAuthorization(request, timestamp);
  if (authResponse) {
    return authResponse; // 401
  }

  try {
    console.log(`[${timestamp}] [INFO] Fetching total blocks and transactions data...`);
    const totalBlocksAndTxsData = await api.get<BlockStats>(API_ROUTES.STATS.TOTAL_BLOCKS_AND_TXS);

    console.log(`[${timestamp}] [INFO] Fetching current epoch data...`);
    const epochData = await fetchCurrentEpoch();

    console.log(`[${timestamp}] [INFO] Fetching total blocks and transactions data for epoch ${epochData.id}...`);
    const currentEpochTotalBlocksAndTxsData = await fetchTotalBlocksAndTxsByEpoch(epochData.id);

    console.log(`[${timestamp}] [INFO] Fetching transactions chart data...`);
    const txsChartData = await fetchRecentTotalBlocksAndTxs();

    console.log(`[${timestamp}] [INFO] Storing all data in KV as a hash...`);
    await kv.hset(KV.HASHES.SHORT_LIVED, {
      [KV.SHORT_LIVED_KEYS.TOTAL_BLOCKS_AND_TXS]: JSON.stringify(totalBlocksAndTxsData),
      [KV.SHORT_LIVED_KEYS.CURRENT_EPOCH_BLOCKS_AND_TXS]: JSON.stringify(currentEpochTotalBlocksAndTxsData),
      [KV.SHORT_LIVED_KEYS.TXS_CHART_DATA]: JSON.stringify(txsChartData)
    });

    console.log(`[${timestamp}] [SUCCESS] CRON job completed successfully`);

    return Response.json({ success: true });

  } catch (error: any) {
    console.error(`[${timestamp}] [ERROR] CRON job failed: ${error.message}`);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }

}