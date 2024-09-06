export const KV = {
  // Redis hash names
  HASHES: {
    SHORT_LIVED: 'short_lived_hash',
    EPOCH_LIVED: 'epoch_lived_hash'
  },

  // Keys inside the short-lived Redis hash
  SHORT_LIVED_KEYS: {
    TOTAL_BLOCKS_AND_TXS: 'short_lived:total_blocks_and_txs',
    CURRENT_EPOCH_BLOCKS_AND_TXS: 'short_lived:current_epoch_blocks_and_txs',
    TXS_CHART_DATA: 'short_lived:txs_chart_data'
  },

  // Keys inside the epoch-lived Redis hash
  EPOCH_LIVED_KEYS: {
    CHAIN_INFO: 'epoch_lived:chain_info'
  }
}
