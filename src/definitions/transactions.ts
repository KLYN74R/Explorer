import { BlockExtendedView } from './blocks';

export interface Transaction {
  v: number;
  creator: string;
  type: string;
  nonce: number;
  fee: number;
  payload: any;
  sigType: string;
  sig: string;
}

export interface TransactionWithTxHash extends Transaction {
  txHash: string;
}

export interface EVMTransaction {
  payload: string;
}

export interface TransactionReceipt {
  shard: string;
  blockID: string;
  order: number;
  isOk: boolean;
  reason?: string;
  createdContractAddress?: string;
  extraDataToReceipt?: string;
}

export interface TransactionExtendedView extends TransactionReceipt, TransactionWithTxHash {
  block: BlockExtendedView;
  typeDescription: string;
  creatorFormatDescription: string;
}

export interface TransactionPreview {
  txid: string;
  txType: string;
  sigType: string;
  fee: number;
  creator?: string;
}