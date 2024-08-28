export interface Pool {
  poolOriginShard: string;
  poolMetadata: {
    type: string;
    lang: string;
    balance: number;
    uno: number;
    gas: number;
    storages: string[];
    bytecode: string;
  };
  poolStorage: {
    percentage: number;
    overStake: number;
    totalPower: number;
    stakers: {
      [key: string]: {
        kly: number;
        uno: number;
      };
    };
    poolURL: string;
    wssPoolURL: string;
  };
}