export interface BlockStats {
  totalBlocksNumber: number;
  totalTxsNumber: number;
  successfulTxsNumber: number;
}

export interface EpochData {
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

export interface Block {
  creator: string;
  time: number;
  epoch: string;
  transactions: Transaction[];
  extraData: {
    epochEdgeOperations: any[];
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
  epochIndex: number;
  index: number;
  txsNumber: number;
  createdAt: string;
}

export interface FinalizationProof {
  prevBlockHash: string;
  blockID: string;
  blockHash: string;
  proofs: {
    [shard: string]: string
  }
}

export interface BlockExtendedData {
  id: string;
  creator: string;
  epochIndex: number;
  index: number;
  txsNumber: number;
  transactions: TransactionWithBlake3Hash[];
  createdAt: string;
  finalizationProof: FinalizationProof;
  prevHash: string;
}

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

export interface TransactionExtendedData extends TransactionReceipt, TransactionWithBlake3Hash {
  typeDescription: string;
  creatorFormat: string;
}

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
