export interface Transaction {
  v: number;
  creator: string;
  type: string;
  nonce: number;
  fee: number;
  payload: {
    sigType: string;
    to: string;
    from?: string;
    amount: number;
  };
  sig: string;
}

export interface TransactionWithBlake3Hash extends Transaction {
  blake3Hash: string;
}

export interface TransactionReceipt {
  blockID: string;
  order: number;
  isOk: boolean;
  reason: string;
}

export interface TransactionExtendedView extends TransactionReceipt, TransactionWithBlake3Hash {
  typeDescription: string;
  creatorFormatDescription: string;
}