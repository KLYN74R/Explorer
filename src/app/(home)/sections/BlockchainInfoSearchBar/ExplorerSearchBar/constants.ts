export const FILTER_OPTIONS = {
  CHOOSE: 'choose',
  TRANSACTION_BY_HASH: 'transactions',
  BLOCK_BY_ID: 'blocks',
  POOL_BY_ID: 'pools',
  CONTRACT_BY_ID: 'contracts'
};

export const PLACEHOLDER_TEXT = {
  [FILTER_OPTIONS.CHOOSE]: '<-- Apply a filter to look up for a TXID, SID, Block ID, Pool ID or Contract ID',
  [FILTER_OPTIONS.TRANSACTION_BY_HASH]: 'Enter the 256 bit BLAKE3 hash of transaction',
  // [FILTER_OPTIONS.BLOCK_BY_SID]: 'Enter the SID in format <shard>:<index>',
  [FILTER_OPTIONS.BLOCK_BY_ID]: 'Enter Block ID in format <epoch>:<shard>:<index>',
  [FILTER_OPTIONS.POOL_BY_ID]: 'Enter Pool ID',
  [FILTER_OPTIONS.CONTRACT_BY_ID]: 'Enter Contract ID',
};