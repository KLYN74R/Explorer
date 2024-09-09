import { fetchEpochById, fetchCurrentEpoch } from '@/data';
import { Epoch } from '@/definitions';

const commonEpochAssertions = (result: Epoch) => {
  expect(typeof result.id).toBe('number');
  expect(typeof result.hash).toBe('string');

  expect(Array.isArray(result.poolsRegistry)).toBeTruthy();
  result.poolsRegistry.forEach(val => expect(typeof val).toBe('string'));

  expect(Array.isArray(result.shardsRegistry)).toBeTruthy();
  result.shardsRegistry.forEach(val => expect(typeof val).toBe('string'));

  expect(typeof result.startTimestamp).toBe('number');
  expect(Array.isArray(result.quorum)).toBeTruthy();
  expect(typeof result.leadersSequence).toBe('object');

  Object.keys(result.leadersSequence).forEach(shard => {
    expect(Array.isArray(result.leadersSequence[shard])).toBeTruthy();
    result.leadersSequence[shard].forEach(val => expect(typeof val).toBe('string'));
  })
}

describe('fetchEpochById Integration Test', () => {
  it('should fetch and return extended epoch data by ID correctly', async () => {
    const id = 0;
    const result = await fetchEpochById(id);

    expect(typeof result).toBe('object');

    commonEpochAssertions(result);

    expect(typeof result.isFirst).toBe('boolean');
    expect(typeof result.isCurrent).toBe('boolean');
    expect(typeof result.shardsNumber).toBe('number');
    expect(typeof result.validatorsNumber).toBe('number');
    expect(typeof result.quorumSize).toBe('number');
    expect(typeof result.totalBlocksNumber).toBe('number');
    expect(typeof result.totalTxsNumber).toBe('number');
    expect(typeof result.txsSuccessRate).toBe('string');
  });
});

describe('fetchCurrentEpoch Integration Test', () => {
  it('should fetch and return current epoch by index correctly', async () => {
    const result = await fetchCurrentEpoch();

    expect(typeof result).toBe('object');

    commonEpochAssertions(result);
  });
});