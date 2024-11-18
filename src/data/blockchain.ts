import api from '@/helpers/api';
import { formatNumber } from '@/helpers';
import { BlockStats, ChainInfo, ShardsData, BlockchainData, RecentBlockStats } from '@/definitions';
import { API_ROUTES } from '@/constants/api';
import { fetchCurrentEpoch } from '@/data/epochs';
import { getInfoFromEpoch, getTxSuccessRate } from './utils';

export async function fetchBlockchainData(): Promise<BlockchainData> {
  try {
    const blocksAndTxsData = await api.get<BlockStats>(API_ROUTES.STATS.TOTAL_BLOCKS_AND_TXS);
    const epochData = await fetchCurrentEpoch();
    const blocksAndTxsDataByEpoch = await fetchTotalBlocksAndTxsByEpoch(epochData.id);
    const chainData = await api.get<ChainInfo>(API_ROUTES.CHAIN.INFO);

    const { shardsNumber, validatorsNumber } = getInfoFromEpoch(epochData);

    const txsSuccessRate = getTxSuccessRate(blocksAndTxsData);

    const slotTimeInSeconds = chainData.approvementThread.params.BLOCK_TIME / 1000;

    const totalStaked = validatorsNumber * chainData.approvementThread.params.VALIDATOR_STAKE;

    return {
      shardsNumber,
      validatorsNumber,
      txsSuccessRate,
      epochId: epochData.id,
      slotTimeInSeconds,
      totalBlocksNumber: formatNumber(blocksAndTxsData.totalBlocksNumber),
      totalTxsNumber: formatNumber(blocksAndTxsData.totalTxsNumber),
      totalBlocksNumberInCurrentEpoch: formatNumber(blocksAndTxsDataByEpoch.totalBlocksNumber),
      totalStaked: formatNumber(totalStaked),
      chainInfo: {
        networkId: chainData.genesis.networkID,
        validatorStakeSize: formatNumber(chainData.approvementThread.params.VALIDATOR_STAKE),
        coreMajorVersion: chainData.approvementThread.version,
        quorumSize: chainData.approvementThread.params.QUORUM_SIZE + ' validators',
        minimalStakePerEntity: chainData.approvementThread.params.MINIMAL_STAKE_PER_ENTITY,
        epochDuration: chainData.approvementThread.params.EPOCH_TIME / 3600000 + ' hours',
        leaderTimeframe: chainData.approvementThread.params.LEADERSHIP_TIMEFRAME / 1000 + ' seconds',
        slotTime: chainData.approvementThread.params.BLOCK_TIME / 1000 + ' second',
        maxBlockSize: (chainData.approvementThread.params.MAX_BLOCK_SIZE_IN_BYTES / 1000000).toFixed(2) + 'Mb'
      }
    };
  } catch (e: any) {
    throw new Error(`Failed to fetch blockchain data - ${e.message}`);
  }
}

export async function fetchTotalBlocksAndTxsByEpoch(id: number | string): Promise<BlockStats> {
  try {
    return await api.get<BlockStats>(API_ROUTES.STATS.TOTAL_BLOCKS_AND_TXS_PER_EPOCH(Number(id)));
  } catch (e: any) {
    throw new Error(`Failed to fetch total blocks and txs by epoch ID "${id}" - ${e.message}`);
  }
}

export async function fetchRecentTotalBlocksAndTxs(limit: number): Promise<RecentBlockStats> {
  try {
    return await api.get<RecentBlockStats>(API_ROUTES.STATS.RECENT_TOTAL_BLOCKS_AND_TXS_PER_EPOCH(limit));
  } catch (e: any) {
    throw new Error(`Failed to fetch recent total blocks and txs - ${e.message}`);
  }
}

export async function fetchCurrentShards(): Promise<string[]> {
  try {
    const currentShardsData = await api.get<ShardsData>(API_ROUTES.CHAIN.CURRENT_SHARDS_LEADERS);

    return Object.keys(currentShardsData);
  } catch (e: any) {
    throw new Error(`Failed to fetch current shards - ${e.message}`);
  }
}
