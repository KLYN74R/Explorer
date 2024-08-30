import api from '@/helpers/api';
import { API_ROUTES } from '@/constants/api';
import { Account } from '@/definitions';

export async function fetchShardAccountById(shard: string, id: string): Promise<Account> {
  try {
    return await api.get<Account>(API_ROUTES.ACCOUNTS.ACCOUNT_BY_ID(shard, id));
  } catch (e: any) {
    throw new Error(`Failed to fetch account by id "${id}" in shard "${shard}" - ${e.message}`);
  }
}