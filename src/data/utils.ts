import { BlockStats, Epoch, EpochExtendedData } from '@/definitions';

export const getInfoFromEpoch = (epoch: Epoch): Pick<EpochExtendedData, 'shardsNumber' | 'validatorsNumber' | 'quorumSize'> => {
  
  const shardsNumber = epoch.shardsRegistry.length;

  let validatorsNumber = epoch.poolsRegistry.length;

  const quorumSize = epoch.quorum.length;

  return {
    shardsNumber,
    validatorsNumber,
    quorumSize
  }
}

export const getTxSuccessRate = (stats: BlockStats): string => {
  return (stats.successfulTxsNumber / stats.totalTxsNumber * 100).toFixed(2) + '%'
}