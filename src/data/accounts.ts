import api from '@/helpers/api';
import { API_ROUTES } from '@/constants';
import { Account, Contract } from '@/definitions';

export async function fetchShardAccountById(shard: string, id: string): Promise<Account|Contract> {
  try {
    return await api.get<Account|Contract>(API_ROUTES.ACCOUNTS.ACCOUNT_BY_ID(shard, id));
  } catch (e: any) {
    throw new Error(`Failed to fetch account by id "${id}" in shard "${shard}" - ${e.message}`);
  }
}