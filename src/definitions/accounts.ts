export interface UserAccount {
  type: string;
  balance: number;
  nonce: number;
  gas: number;
  pqcPub?: string;
  rev_t?: number;
}

export interface ContractAccount {
  type: string;
  lang: string;
  balance: number;
  gas: number;
  storages: string[];
  storageAbstractionLastPayment: number;
}

