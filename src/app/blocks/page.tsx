import {
  GeneralBlocksInfo,
  BlocksByShard
} from './sections';

export default function BlocksPage() {
  return (
    <>
      <GeneralBlocksInfo />
      <BlocksByShard />
    </>
  );
}