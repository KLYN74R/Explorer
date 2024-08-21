import api from '@/helpers/api';
import { formatNumber } from '@/helpers';
import { BlockStats, ChainInfo, Epoch, ShardsData } from '@/definitions';
import { API_ROUTES } from '@/constants/api';

export async function fetchBlockchainData(): Promise<{
  epochId: number;
  shardsNumber: number;
  validatorsNumber: number;
  totalTxsNumber: string;
  txsSuccessRate: string;
  totalBlocksNumber: string;
  totalBlocksNumberInCurrentEpoch: string;
  totalStaked: string;
  slotTime: number;
}> {
  try {
    const blocksAndTxsData = await api.get<BlockStats>(API_ROUTES.STATS.TOTAL_BLOCKS_AND_TXS);
    const epochData = await api.get<Epoch>(API_ROUTES.EPOCH.CURRENT_EPOCH_AT);
    const blocksAndTxsDataByEpoch = await api.get<BlockStats>(API_ROUTES.STATS.TOTAL_BLOCKS_AND_TXS_PER_EPOCH(epochData.id));
    const chainData = await api.get<ChainInfo>(API_ROUTES.CHAIN.INFO);

    const slotTimeInSeconds = chainData.approvementThread.options.BLOCK_TIME / 1000;
    const shardsNumber = Object.keys(epochData.leadersSequence).length;

    const { totalTxsNumber, successfulTxsNumber } = blocksAndTxsData;
    const txsSuccessRate = (successfulTxsNumber / totalTxsNumber * 100).toFixed(2) + '%';

    let validatorsNumber = 0;
    for (const reservePools of Object.values(epochData.leadersSequence)) {
      validatorsNumber += reservePools.length + 1;
    }

    const totalStaked = validatorsNumber * chainData.approvementThread.options.VALIDATOR_STAKE;

    return {
      shardsNumber,
      validatorsNumber,
      txsSuccessRate,
      epochId: epochData.id,
      slotTime: slotTimeInSeconds,
      totalBlocksNumber: formatNumber(blocksAndTxsData.totalBlocksNumber),
      totalTxsNumber: formatNumber(totalTxsNumber),
      totalBlocksNumberInCurrentEpoch: formatNumber(blocksAndTxsDataByEpoch.totalBlocksNumber),
      totalStaked: formatNumber(totalStaked),
    };
  } catch (e: any) {
    throw new Error(`Failed to fetch general blockchain data - ${e.message}`);
  }
}

export async function fetchChainInfo(): Promise<{
  symbioticChainId: string;
  validatorStakeSize: string;
  workflowMajorVersion: number;
  quorumSize: string;
  unstakingPeriod: string;
  epochDuration: string;
  leaderTimeframe: string;
  slotTime: string;
  maxBlockSize: string;
  limitForOperations: number;
}> {
  try {
    const chainData = await api.get<ChainInfo>(API_ROUTES.CHAIN.INFO);

    return {
      symbioticChainId: chainData.genesis.symbioteID,
      validatorStakeSize: formatNumber(chainData.approvementThread.options.VALIDATOR_STAKE),
      workflowMajorVersion: chainData.approvementThread.version,
      quorumSize: chainData.approvementThread.options.QUORUM_SIZE + ' validators',
      unstakingPeriod: chainData.approvementThread.options.UNSTAKING_PERIOD + ' epoches',
      epochDuration: chainData.approvementThread.options.EPOCH_TIME / 3600000 + ' hours',
      leaderTimeframe: chainData.approvementThread.options.LEADERSHIP_TIMEFRAME / 1000 + ' seconds',
      slotTime: chainData.approvementThread.options.BLOCK_TIME / 1000 + ' second',
      maxBlockSize: (chainData.approvementThread.options.MAX_BLOCK_SIZE_IN_BYTES / 1000000).toFixed(2) + 'Mb',
      limitForOperations: chainData.approvementThread.options.EPOCH_EDGE_OPERATIONS_LIMIT_PER_BLOCK
    };
  } catch (e: any) {
    throw new Error(`Failed to fetch chain info - ${e.message}`);
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
