import {
  GeneralBlocksInfo,
  BlocksByShard
} from './sections';

export default function Blocks() {
  return (
    <>
      <GeneralBlocksInfo />
      <BlocksByShard />
    </>
  );
}