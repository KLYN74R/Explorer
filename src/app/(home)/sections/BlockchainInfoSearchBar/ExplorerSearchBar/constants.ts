export const OPTIONS = {
  CHOOSE: 'choose',
  TRANSACTION_BY_HASH: 'transaction_by_hash',
  BLOCK_BY_SID: 'block_by_sid',
  BLOCK_BY_ID: 'block_by_id',
  POOL_BY_ID: 'pool_by_id',
  EPOCH_BY_ID: 'epoch_by_id',
  ACCOUNT_BY_ID: 'account_by_id',
  CONTRACT_BY_ID: 'contract_by_id'
};

export const OPTIONS_PLACEHOLDER = {
  [OPTIONS.CHOOSE]: '<-- Apply a filter to look up for a TXID, SID, Block, Pool, Account or Contract ID',
  [OPTIONS.TRANSACTION_BY_HASH]: 'Enter the Tx ID - BLAKE3(KLY) or SHA3(EVM) hash of transaction',
  [OPTIONS.BLOCK_BY_SID]: 'Enter the SID in format <shard>:<index>',
  [OPTIONS.BLOCK_BY_ID]: 'Enter Block ID in format <epoch>:<creator>:<index>',
  [OPTIONS.POOL_BY_ID]: 'Enter Pool ID in format <pool pubkey>(POOL)',
  [OPTIONS.EPOCH_BY_ID]: 'Enter epoch index',
  [OPTIONS.ACCOUNT_BY_ID]: 'Enter Account ID in format <shard>:<account>',
  [OPTIONS.CONTRACT_BY_ID]: 'Enter Contract ID in format <shard>:<contract>',
};

export const OPTIONS_URL = {
  [OPTIONS.CHOOSE]: '#',
  [OPTIONS.TRANSACTION_BY_HASH]: '/transactions',
  [OPTIONS.BLOCK_BY_SID]: '/blocks',
  [OPTIONS.BLOCK_BY_ID]: '/blocks',
  [OPTIONS.POOL_BY_ID]: '/pools',
  [OPTIONS.EPOCH_BY_ID]: '/epochs',
  [OPTIONS.ACCOUNT_BY_ID]: '/accounts',
  [OPTIONS.CONTRACT_BY_ID]: '/contracts',
};