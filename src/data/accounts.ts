import api from '@/helpers/api';
import { API_ROUTES } from '@/constants/api';
import { UserAccount, ContractAccount } from '@/definitions';

export async function fetchShardAccountById(shard: string, id: string): Promise<UserAccount|ContractAccount> {
  try {
    return await api.get<UserAccount|ContractAccount>(API_ROUTES.ACCOUNTS.ACCOUNT_BY_ID(shard, id));
  } catch (e: any) {
    throw new Error(`Failed to fetch account by id "${id}" in shard "${shard}" - ${e.message}`);
  }
}