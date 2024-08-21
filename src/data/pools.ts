import api from '@/helpers/api';
import { Pool } from '@/definitions';
import { API_ROUTES } from '@/constants/api';

export async function fetchPoolById(poolId: string): Promise<Pool> {
  try {
    return await api.get<Pool>(API_ROUTES.POOL.POOL_STATS(poolId));
  } catch (e: any) {
    throw new Error(`Failed to fetch pool by ID "${poolId}" - ${e.message}`);
  }
}
