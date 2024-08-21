export interface BlockStats {
  totalBlocksNumber: number;
  totalTxsNumber: number;
  successfulTxsNumber: number;
}

export interface Epoch {
  id: number;
  hash: string;
  poolsRegistry: {
    primePools: string[];
    reservePools: any[];
  };
  startTimestamp: number;
  quorum: string[];
  leadersSequence: { [key: string]: any[] };
}

export interface ChainInfo {
  genesis: {
    symbioteID: string;
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
    options: ChainOptions;
  };
  approvementThread: {
    version: number;
    options: ChainOptions;
  };
}

export interface ChainOptions {
  VALIDATOR_STAKE: number;
  REWARD_PERCENTAGE_FOR_BLOCK_CREATOR: number;
  MINIMAL_STAKE_PER_ENTITY: number;
  POOL_AFK_MAX_TIME: number;
  UNSTAKING_PERIOD: number;
  QUORUM_SIZE: number;
  EPOCH_TIME: number;
  LEADERSHIP_TIMEFRAME: number;
  BLOCK_TIME: number;
  MAX_BLOCK_SIZE_IN_BYTES: number;
  TXS_LIMIT_PER_BLOCK: number;
  EPOCH_EDGE_OPERATIONS_LIMIT_PER_BLOCK: number;
  DEFAULT_PAYMENT_IF_WRONG_TYPE: number;
  MAX_NUM_OF_BLOCKS_PER_SHARD_FOR_SYNC_OPS: number;
}

export interface ShardsData {
  [shard: string]: any
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
