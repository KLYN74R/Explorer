import { Transaction, TransactionWithTxHash } from './transactions';

export enum BLOCK_ID_TYPE {
  SID = 'sid',
  BLOCK_ID = 'block_id'
}

export interface Block {
  creator: string;
  time: number;
  epoch: string;
  transactions: Transaction[];
  extraData: {
    rest: object;
  };
  index: number;
  prevHash: string;
  sig: string;
  hash: string;
}

export interface BlockPreview {
  id: string;
  sid: string;
  creator: string;
  epochId: number;
  index: number;
  txsNumber: number;
  createdAt: string;
}

export interface BlockExtendedView {
  id: string;
  truncatedId: string;
  creator: string;
  epoch: string;
  epochId: number;
  index: number;
  txsNumber: number;
  transactions: TransactionWithTxHash[];
  createdAt: string;
  aggregatedFinalizationProof: AggregatedFinalizationProof;
  prevHash: string;
}

export interface AggregatedFinalizationProof {
  prevBlockHash: string;
  blockID: string;
  blockHash: string;
  proofs: {
    [shard: string]: string
  }
}