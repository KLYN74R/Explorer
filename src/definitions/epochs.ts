export interface Epoch {
  id: number;
  hash: string;
  poolsRegistry: {
    primePools: string[];
    reservePools: any[];
  };
  startTimestamp: number;
  quorum: string[];
  leadersSequence: { [key: string]: any[] };
}

export type EpochExtendedData = Epoch & {
  isFirst: boolean;
  isCurrent: boolean;
  shardsNumber: number;
  validatorsNumber: number;
  quorumSize: number;
  totalBlocksNumber: number;
  totalTxsNumber: number;
  txsSuccessRate: string;
}