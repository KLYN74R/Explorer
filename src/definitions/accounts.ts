export interface UserAccount {
  type: string;
  balance: number;
  uno: number;
  nonce: number;
  gas: number;
  pqcPub?: string;
  rev_t?: number;
}

export interface ContractAccount {
  type: string;
  lang: string;
  balance: number;
  uno: number;
  gas: number;
  storages: string[];
  storageAbstractionLastPayment: number;
}

