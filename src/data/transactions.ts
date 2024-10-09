import api from '@/helpers/api';
import { API_ROUTES } from '@/constants/api';
import {
  TransactionExtendedView,
  TransactionReceipt,
  TransactionWithTxHash,
  TransactionPreview,
  TX_TYPE
} from '@/definitions';
import { fetchBlockById } from './blocks';

export async function fetchTransactionByTxHash(hash: string): Promise<TransactionExtendedView> {
  try {
    const receipt = await api.get<TransactionReceipt>(API_ROUTES.TRANSACTIONS.TX_RECEIPT(hash));
    const block = await fetchBlockById(receipt.blockID);

    const transaction = block.transactions
      .find(tx => tx.txHash === hash) as TransactionWithTxHash;

    return {
      block,
      ...receipt,
      ...transaction,
      typeDescription: describeTransactionType(transaction.type),
      creatorFormatDescription: describeTransactionCreatorFormat(transaction.creator)
    }
  } catch (e: any) {
    throw new Error(`Failed to fetch transaction by hash "${hash}" - ${e.message}`);
  }
}

export async function fetchAccountTransactions(shard: string, accountId: string): Promise<TransactionPreview[]> {
  try {
    return await api.get<TransactionPreview[]>(API_ROUTES.TRANSACTIONS.ACCOUNT_TRANSACTIONS(shard, accountId));
  } catch (e: any) {
    throw new Error(`Failed to fetch transactions by account id "${accountId}" in shard "${shard}" - ${e.message}`);
  }
}

function describeTransactionType(type: string) {
  switch (type) {
    case TX_TYPE.TX:
      return 'simple address to address tx';
    case TX_TYPE.WVM_CONTRACT_DEPLOY:
      return 'contract deployment to WASM vm';
    case TX_TYPE.WVM_CALL:
      return 'call smart-contract in WASM vm';
    case TX_TYPE.EVM_CALL:
      return 'interaction with EVM';
    default:
      return '';
  }
}

export function describeTransactionCreatorFormat(creator: string) {
  const length = creator.length;

  if (length === 44) {
    return 'ED25519';
  } else if (length === 98) {
    return 'BLS, multisig';
  } else if (length === 96) {
    return 'TBLS, tsig';
  } else if (length === 64) {
    return 'PQC, post-quantum';
  } else if (length === 42) {
    return 'ECDSA, EVM-compatible';
  } else {
    return 'Unknown format';
  }
}