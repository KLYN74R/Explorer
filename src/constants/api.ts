export const API_ROUTES = {
  STATS: {
    TOTAL_BLOCKS_AND_TXS: 'total_blocks_and_txs_stats',
    TOTAL_BLOCKS_AND_TXS_PER_EPOCH: (epochId: number) => `total_blocks_and_txs_stats_per_epoch/${epochId}`,
  },
  EPOCH: {
    CURRENT_EPOCH_AT: 'current_epoch/at',  // Approvement thread
  },
  CHAIN: {
    INFO: 'chain_info',
    CURRENT_SHARDS_LEADERS: 'current_shards_leaders',
    SYNCHRONIZATION_STATS: 'synchronization_stats',
  },
  BLOCKS: {
    LATEST_N_BLOCKS: (shard: string, startIndex: number, limit: number) => `latest_n_blocks/${shard}/${startIndex}/${limit}`,
    BLOCK_BY_SID: (shard: string, indexInShard: string) => `block_by_sid/${shard}/${indexInShard}`,
    BLOCK_BY_ID: (blockId: string) => `block/${blockId}`,
    AGGREGATED_FINALIZATION_PROOF: (blockId: string) => `aggregated_finalization_proof/${blockId}`,
  },
  POOL: {
    POOL_STATS: (poolId: string) => `pool_stats/${poolId}`,
  },
  TRANSACTION: {
    TX_RECEIPT: (txBlake3Hash: string) => `tx_receipt/${txBlake3Hash}`,
  },
};