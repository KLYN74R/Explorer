import api from './api';
import {
  BlockStats,
  ChainInfo,
  EpochData,
  ShardsData,
  SyncStats,
  Block,
  BlockPreview,
  FinalizationProof,
  BlockExtendedData,
  TransactionExtendedData,
  TransactionReceipt,
  TransactionWithBlake3Hash,
  Pool
} from '@/definitions';
import { getPrettyDate, getFullDate } from './time';
import { BLOCKS_PER_PAGE } from './constants';
import { hashData } from '@/helpers/blake3';

export async function fetchGeneralBlockchainData(): Promise<{
  epochId: number;
  shardsNumber: number;
  validatorsNumber: number;
  totalTxsNumber: number;
  txsSuccess: string;
  totalBlocksNumber: number;
  totalBlocksNumberInCurrentEpoch: number;
  totalStaked: number;
  slotTime: number;
}> {
  try {
    const blocksAndTxsData = await api.get<BlockStats>('total_blocks_and_txs_stats');
    const epochData = await api.get<EpochData>('current_epoch/at');
    const blocksAndTxsDataByEpoch = await api.get<BlockStats>(`total_blocks_and_txs_stats_per_epoch/${epochData.id}`);
    const chainData = await api.get<ChainInfo>('chain_info');

    const slotTime = chainData.approvementThread.options.BLOCK_TIME / 1000;
    const shardsNumber = Object.keys(epochData.leadersSequence).length;

    const { totalTxsNumber, successfulTxsNumber } = blocksAndTxsData;
    const txsSuccess = (successfulTxsNumber / totalTxsNumber) * 100 + '%';

    let validatorsNumber = 0;
    for (const reservePools of Object.values(epochData.leadersSequence)) {
      validatorsNumber += reservePools.length + 1;
    }

    const totalStaked = validatorsNumber * chainData.approvementThread.options.VALIDATOR_STAKE;

    return {
      epochId: epochData.id,
      shardsNumber,
      validatorsNumber,
      totalBlocksNumber: blocksAndTxsData.totalBlocksNumber,
      txsSuccess,
      totalTxsNumber,
      totalBlocksNumberInCurrentEpoch: blocksAndTxsDataByEpoch.totalBlocksNumber,
      totalStaked,
      slotTime
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch blockchain data.');
  }
}

export async function fetchChainData(): Promise<{
  symbioticChainId: string;
  validatorStakeSize: string;
  blockCreatorReward: string;
  afkMaxtime: string;
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
    const chainData = await api.get<ChainInfo>('chain_info');

    return {
      symbioticChainId: chainData.genesis.symbioteID,
      validatorStakeSize: chainData.approvementThread.options.VALIDATOR_STAKE / 1000 + 'K',
      blockCreatorReward: chainData.approvementThread.options.REWARD_PERCENTAGE_FOR_BLOCK_CREATOR * 100 + '%',
      afkMaxtime: chainData.approvementThread.options.POOL_AFK_MAX_TIME + ' epoches',
      workflowMajorVersion: chainData.approvementThread.version,
      quorumSize: chainData.approvementThread.options.QUORUM_SIZE + ' validators',
      unstakingPeriod: chainData.approvementThread.options.UNSTAKING_PERIOD + ' epoches',
      epochDuration: chainData.approvementThread.options.EPOCH_TIME / 3600000 + ' hours',
      leaderTimeframe: chainData.approvementThread.options.LEADERSHIP_TIMEFRAME / 1000 + ' seconds',
      slotTime: chainData.approvementThread.options.BLOCK_TIME / 1000 + ' second',
      maxBlockSize: chainData.approvementThread.options.MAX_BLOCK_SIZE_IN_BYTES / 1000000 + 'Mb',
      limitForOperations: chainData.approvementThread.options.EPOCH_EDGE_OPERATIONS_LIMIT_PER_BLOCK
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch chain data.');
  }
}

export async function fetchCurrentShards(): Promise<string[]> {
  const currentShardsData = await api.get<ShardsData>('current_shards_leaders');

  return Object.keys(currentShardsData);
}

export async function fetchBlocksByShard(shard: string, currentPage: number): Promise<BlockPreview[]> {
  const syncStats = await api.get<SyncStats>('synchronization_stats');
  const latestBlockIndex = syncStats.heightPerShard[shard];

  const startIndex = latestBlockIndex - 1;
  const blocks = await api.get<Array<Block & {sid: string}>>(
    `latest_n_blocks/${shard}/${startIndex}/${BLOCKS_PER_PAGE * currentPage}`
  );

  return blocks.map(block => {
    const { sid, creator, epoch, index, transactions, time } = block;

    const epochIndex = Number(epoch.split('#')[1]);
    const id = epochIndex + ':' + creator + ':' + index;

    const txsNumber = transactions.length;
    const createdAt = getPrettyDate(time);

    return {
      id,
      sid,
      creator,
      epochIndex,
      index,
      txsNumber,
      createdAt
    }
  });
}

export async function getBlockById(id: string): Promise<BlockExtendedData> {
  const block = await api.get<Block>(`block/${id}`);

  const {  creator, index, transactions: blockTxs, time, epoch, prevHash } = block;
  const txsNumber = blockTxs.length;
  const createdAt = getFullDate(time);

  const epochIndex = Number(epoch.split('#')[1]);

  const finalizationProof = await getFinalizationProof(id);

  const transactions = await Promise.all(
    blockTxs.map(async (tx) => ({
      ...tx,
      blake3Hash: await hashData(tx.sig)
    }))
  );

  return {
    id,
    creator,
    epochIndex,
    index,
    transactions,
    txsNumber,
    createdAt,
    prevHash,
    finalizationProof
  };
}

export async function getFinalizationProof(blockId: string): Promise<FinalizationProof> {
  return await api.get<FinalizationProof>(`aggregated_finalization_proof/${blockId}`);
}

export async function getTransactionByBlake3Hash(hash: string): Promise<TransactionExtendedData> {
  const receipt = await api.get<TransactionReceipt>(`tx_receipt/${hash}`);
  const block = await getBlockById(receipt.blockID);

  const transaction = block.transactions
    .find(tx => tx.blake3Hash === hash) as TransactionWithBlake3Hash;

  return {
    ...receipt,
    ...transaction,
    typeDescription: describeTransactionType(transaction.type),
    creatorFormat: describeTransactionCreatorFormat(transaction.creator)
  }
}

function describeTransactionType(type: string) {
  switch (type) {
    case 'TX':
      return 'simple address to address tx';
    case 'WVM_CONTRACT_DEPLOY':
      return 'contract deployment to WASM vm';
    case 'WVM_CALL':
      return 'call smart-contract function in WASM vm';
    case 'EVM_CALL':
      return 'call smart-contract function in EVM';
    default:
      return '';
  }
}

function describeTransactionCreatorFormat(creator: string) {
  const length = creator.length;

  if (length === 44) {
    return 'ED25519';
  } else if (length === 98) {
    return 'BLS, multisig';
  } else if (length === 96) {
    return 'TBLS, tsig';
  } else if (length === 64) {
    return 'PQC, post-quantum';
  } else {
    return 'Unknown format';
  }
}


export async function getPoolById(id: string): Promise<Pool> {
  return await api.get<Pool>(`pool_stats/${id}`);
}
