export interface Pool {
  poolMetadataFromState: {
    type: string;
    lang: string;
    balance: number;
    uno: number;
    storages: string[];
    bytecode: string;
  };
  poolStorageFromState: {
    percentage: number;
    overStake: number;
    whiteList: string[];
    totalPower: number;
    lackOfTotalPower: boolean;
    stopCheckpointID: number;
    isReserve: boolean;
    stakers: {
      [key: string]: {
        kly: number;
        uno: number;
      };
    };
    waitingRoom: Record<string, unknown>;
    poolURL: string;
    wssPoolURL: string;
  };
  poolStorageFromApprovementThread: {
    totalPower: number;
    lackOfTotalPower: boolean;
    stopEpochID: number;
    isReserve: boolean;
    poolURL: string;
    wssPoolURL: string;
  };
}