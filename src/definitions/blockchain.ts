export interface BlockStats {
  totalBlocksNumber: number;
  totalTxsNumber: number;
  successfulTxsNumber: number;
}

export interface RecentBlockStats {
  [epochId: string]: BlockStats
}

export interface ChainInfo {
  genesis: {
    networkID: string;
    startOfFirstEpoch: number;
    workflowID: string;
    hivemind: string[];
    hostchains: {
      [key: string]: {
        blockWithGenesisCommit: number;
      };
    };
  };
  verificationThread: {
    version: number;
    params: NetworkParams;
  };
  approvementThread: {
    version: number;
    params: NetworkParams;
  };
}

export interface NetworkParams {
  VALIDATOR_STAKE: number;
  MINIMAL_STAKE_PER_ENTITY: number;
  UNSTAKING_PERIOD: number;
  QUORUM_SIZE: number;
  EPOCH_TIME: number;
  LEADERSHIP_TIMEFRAME: number;
  BLOCK_TIME: number;
  MAX_BLOCK_SIZE_IN_BYTES: number;
  EPOCH_EDGE_TRANSACTIONS_LIMIT_PER_BLOCK: number;
  MAX_NUM_OF_BLOCKS_PER_SHARD_FOR_SYNC_OPS: number;
}

export interface ShardsData {
  [shard: string]: string
}

export interface SyncStats {
  heightPerShard: {
    [key: string]: number;
  };
  epochMetadata: {
    id: number;
    hash: string;
    startTimestamp: number;
  };
}

export interface BlockchainData {
  epochId: number;
  shardsNumber: number;
  validatorsNumber: number;
  totalTxsNumber: string;
  txsSuccessRate: string;
  totalBlocksNumber: string;
  totalBlocksNumberInCurrentEpoch: string;
  totalStaked: string;
  slotTimeInSeconds: number;
  chainInfo: {
    networkId: string;
    validatorStakeSize: string;
    coreMajorVersion: number;
    quorumSize: string;
    unstakingPeriod: string;
    epochDuration: string;
    leaderTimeframe: string;
    slotTime: string;
    maxBlockSize: string;
    limitForOperations: number;
  }
}
