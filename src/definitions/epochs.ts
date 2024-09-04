export interface Epoch {
  id: number;
  hash: string;
  poolsRegistry: string[];
  shardsRegistry: string[];
  startTimestamp: number;
  quorum: string[];
  leadersSequence: { [shard: string]: string[] };
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