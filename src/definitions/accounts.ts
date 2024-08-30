export interface Account {
  type: string;
  balance: number;
  uno: number;
  nonce: number;
  gas: number;
  shard: string;
  pqcPub?: string;
  rev_t?: number;
}

export interface Contract {
  type: string;
  lang: string;
  balance: number;
  uno: number;
  gas: number;
  storages: string[];
  storageAbstractionLastPayment: number;
  bytecode: string;
}

