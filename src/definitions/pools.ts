export interface Pool {
  
  isActiveValidator: boolean;
  isCurrentQuorumMember: boolean;
  
  poolOriginShard: string;
  poolMetadata: {
    type: string;
    lang: string;
    balance: number;
    uno: number;
    gas: number;
    storages: string[];
    storageAbstractionLastPayment: number;
  };
  poolStorage: {
    percentage: number;
    overStake: number;
    totalPower: number;
    stakers: Stakers;
    poolURL: string;
    wssPoolURL: string;
  };
}

export interface Stakers {
  [key: string]: {
    kly: number;
    uno: number;
  }
}