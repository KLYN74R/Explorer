import api from '@/helpers/api';
import { TransactionExtendedView, TransactionReceipt, TransactionWithBlake3Hash } from '@/definitions';
import { fetchBlockById } from './blocks';
import { API_ROUTES } from '@/constants/api';

export async function fetchTransactionByBlake3Hash(hash: string): Promise<TransactionExtendedView> {
  try {
    const receipt = await api.get<TransactionReceipt>(API_ROUTES.TRANSACTION.TX_RECEIPT(hash));
    const block = await fetchBlockById(receipt.blockID);

    const transaction = block.transactions
      .find(tx => tx.blake3Hash === hash) as TransactionWithBlake3Hash;

    return {
      ...receipt,
      ...transaction,
      typeDescription: describeTransactionType(transaction.type),
      creatorFormatDescription: describeTransactionCreatorFormat(transaction.creator)
    }
  } catch (e: any) {
    throw new Error(`Failed to fetch transaction by hash "${hash}" - ${e.message}`);
  }
}

function describeTransactionType(type: string) {
  switch (type) {
    case 'TX':
      return 'simple address to address tx';
    case 'WVM_CONTRACT_DEPLOY':
      return 'contract deployment to WASM vm';
    case 'WVM_CALL':
      return 'call smart-contract function in WASM vm';
    case 'EVM_CALL':
      return 'call smart-contract function in EVM';
    default:
      return '';
  }
}

function describeTransactionCreatorFormat(creator: string) {
  const length = creator.length;

  if (length === 44) {
    return 'ED25519';
  } else if (length === 98) {
    return 'BLS, multisig';
  } else if (length === 96) {
    return 'TBLS, tsig';
  } else if (length === 64) {
    return 'PQC, post-quantum';
  } else {
    return 'Unknown format';
  }
}