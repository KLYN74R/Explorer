import { Epoch, EpochExtendedData } from '@/definitions';
import api from '@/helpers/api';
import { API_ROUTES } from '@/constants/api';
import { fetchTotalBlocksAndTxsByEpoch } from '@/data/blockchain';
import { getInfoFromEpoch, getTxSuccessRate } from './utils';

export async function fetchEpochById(id: number): Promise<EpochExtendedData> {
  try {
    const currentEpoch = await fetchCurrentEpoch();

    const isFirst = id === 0;
    const isCurrent = id === currentEpoch.id;

    const epoch = isCurrent
      ? currentEpoch
      : await api.get<Epoch>(API_ROUTES.EPOCH.EPOCH_BY_INDEX(id));

    const { shardsNumber, validatorsNumber, quorumSize } = getInfoFromEpoch(epoch);

    const totalBlocksAndTxsData = await fetchTotalBlocksAndTxsByEpoch(epoch.id);
    const { totalBlocksNumber, totalTxsNumber  } = totalBlocksAndTxsData;
    const txsSuccessRate = getTxSuccessRate(totalBlocksAndTxsData);

    return {
      ...epoch,
      isFirst,
      isCurrent,
      shardsNumber,
      validatorsNumber,
      quorumSize,
      totalBlocksNumber,
      totalTxsNumber,
      txsSuccessRate
    }
  } catch (e: any) {
    throw new Error(`Failed to fetch epoch by index "${id}" - ${e.message}`);
  }
}

export async function fetchCurrentEpoch(): Promise<Epoch> {
  try {
    return await api.get<Epoch>(API_ROUTES.EPOCH.CURRENT_EPOCH_AT);
  } catch (e: any) {
    throw new Error(`Failed to fetch current epoch - ${e.message}`);
  }
}