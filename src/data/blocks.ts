import api from '@/helpers/api';
import { FormattedDate, hashData, parseEvmTransaction, truncateMiddle } from '@/helpers';
import {
  Block,
  BLOCK_ID_TYPE,
  BlockExtendedView,
  BlockPreview,
  AggregatedFinalizationProof,
  SyncStats,
  EVMTransaction
} from '@/definitions';
import { BLOCKS_PER_PAGE } from '@/constants';
import { API_ROUTES } from '@/constants/api';

export async function fetchBlocksByShard(shard: string, currentPage: number): Promise<BlockPreview[]> {
  try {
    const syncStats = await api.get<SyncStats>(API_ROUTES.CHAIN.SYNCHRONIZATION_STATS);
    const latestBlockIndex = syncStats.heightPerShard[shard];

    const startIndex = latestBlockIndex - 1;
    const blocks = await api.get<
      Array<Block & { sid: string }>
    >(API_ROUTES.BLOCKS.LATEST_N_BLOCKS(shard, startIndex, BLOCKS_PER_PAGE * currentPage));

    return blocks.map(block => {
      const {sid, creator, epoch, index, transactions, time} = block;

      const epochId = getEpochId(epoch);
      const id = epochId + ':' + creator + ':' + index;

      const txsNumber = transactions.length;
      const createdAt = new FormattedDate(time).preview;

      return {
        id,
        sid,
        creator,
        epochId,
        index,
        txsNumber,
        createdAt
      }
    });
  } catch (e: any) {
    throw new Error(`Failed to fetch blocks by shard "${shard}" - ${e.message}`);
  }
}

export async function fetchBlockById(id: string): Promise<BlockExtendedView> {
  let block;

  try {
    if (identifyIdType(id) === BLOCK_ID_TYPE.SID) {
      const [shard, indexInShard] = id.split(':');
      block = await api.get<Block>(API_ROUTES.BLOCKS.BLOCK_BY_SID(shard, indexInShard));
    } else {
      block = await api.get<Block>(API_ROUTES.BLOCKS.BLOCK_BY_ID(id));
    }

    const {  creator, index, transactions: blockTxs, time, epoch, prevHash } = block;
    const txsNumber = blockTxs.length;
    const createdAt = new FormattedDate(time).full;

    const epochId = getEpochId(epoch);

    const blockId = epochId + ':' + creator + ':' + index;
    const truncatedBlockId = `${epochId}:${truncateMiddle(creator)}:${index}`;

    const aggregatedFinalizationProof = await fetchAggregatedFinalizationProof(blockId);

    const transactions = await Promise.all(
      blockTxs.map(async (tx) =>
        tx.type === 'EVM_CALL'
          ? parseEvmTransaction(tx as EVMTransaction)
          : { ...tx, txHash: await hashData(tx.sig) }
      )
    );

    return {
      id: blockId,
      truncatedId: truncatedBlockId,
      creator,
      epoch,
      epochId,
      index,
      transactions,
      txsNumber,
      createdAt,
      prevHash,
      aggregatedFinalizationProof
    };
  } catch (e: any) {
    throw new Error(`Failed to fetch block by ID "${id}" - ${e.message}`);
  }
}

export async function fetchAggregatedFinalizationProof(id: string): Promise<AggregatedFinalizationProof> {
  let blockId = id;

  try {
    if (identifyIdType(id) === BLOCK_ID_TYPE.SID) {
      const [shard, indexInShard] = id.split(':');
      const {epoch, creator, index} = await api.get<Block>(API_ROUTES.BLOCKS.BLOCK_BY_SID(shard, indexInShard));

      const epochId = getEpochId(epoch);

      blockId = epochId + ':' + creator + ':' + index;
    }

    return await api.get(API_ROUTES.BLOCKS.AGGREGATED_FINALIZATION_PROOF(blockId));
  } catch (e: any) {
    throw new Error(`Failed to fetch aggregated finalization proof by block ID "${blockId}" - ${e.message}`);
  }
}

function identifyIdType(id: string): BLOCK_ID_TYPE {
  const isSID = id.split(':').length === 2;

  return isSID ? BLOCK_ID_TYPE.SID : BLOCK_ID_TYPE.BLOCK_ID;
}

function getEpochId(fullEpoch: string): number {
  return Number(fullEpoch.split('#')[1]);
}