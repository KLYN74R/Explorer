import {
  fetchBlockchainData,
  fetchCurrentShards,
  fetchRecentTotalBlocksAndTxs,
  fetchTotalBlocksAndTxsByEpoch
} from '@/data';

describe('fetchBlockchainData Integration Tests', () => {
  it('should fetch and return formatted blockchain data correctly', async () => {
    const result = await fetchBlockchainData();

    expect(typeof result).toBe('object');

    expect(typeof result.epochId).toBe('number');
    expect(typeof result.shardsNumber).toBe('number');
    expect(typeof result.validatorsNumber).toBe('number');
    expect(typeof result.totalTxsNumber).toBe('string');
    expect(typeof result.txsSuccessRate).toBe('string');
    expect(typeof result.totalBlocksNumber).toBe('string');
    expect(typeof result.totalBlocksNumberInCurrentEpoch).toBe('string');
    expect(typeof result.totalStaked).toBe('string');
    expect(typeof result.slotTimeInSeconds).toBe('number');

    expect(typeof result.chainInfo.networkId).toBe('string');
    expect(typeof result.chainInfo.validatorStakeSize).toBe('string');
    expect(typeof result.chainInfo.coreMajorVersion).toBe('number');
    expect(typeof result.chainInfo.quorumSize).toBe('string');
    expect(typeof result.chainInfo.unstakingPeriod).toBe('string');
    expect(typeof result.chainInfo.epochDuration).toBe('string');
    expect(typeof result.chainInfo.leaderTimeframe).toBe('string');
    expect(typeof result.chainInfo.slotTime).toBe('string');
    expect(typeof result.chainInfo.maxBlockSize).toBe('string');
    expect(typeof result.chainInfo.limitForOperations).toBe('number');
  });
});

describe('fetchTotalBlocksAndTxsByEpoch Integration Test', () => {
  it('should fetch and return block and transaction stats by epoch index correctly', async () => {
    const epochId = 0;
    const result = await fetchTotalBlocksAndTxsByEpoch(epochId);

    expect(typeof result).toBe('object');

    expect(typeof result.totalBlocksNumber).toBe('number');
    expect(typeof result.totalTxsNumber).toBe('number');
    expect(typeof result.successfulTxsNumber).toBe('number');
  });
});

describe('fetchRecentTotalBlocksAndTxs Integration Test', () => {
  it('should fetch and return an array of block and transaction stats by epochs correctly', async () => {
    const result = await fetchRecentTotalBlocksAndTxs(1);

    expect(typeof result).toBe('object');

    Object.keys(result).forEach(epochId => {
      expect(typeof result[epochId].totalBlocksNumber).toBe('number');
      expect(typeof result[epochId].totalTxsNumber).toBe('number');
      expect(typeof result[epochId].successfulTxsNumber).toBe('number');
    })
  });
});

describe('fetchCurrentShards Integration Test', () => {
  it('should fetch and return current shards correctly', async () => {
    const shard = 'shard_0';
    const result = await fetchCurrentShards();

    expect(typeof result).toBe('object');

    expect(result.includes(shard)).toBeTruthy();
    result.forEach(shardVal => {
      expect(typeof shardVal).toBe('string');
    })
  });
});
