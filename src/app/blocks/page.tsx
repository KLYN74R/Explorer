import {
  GeneralBlocksInfo,
  BlocksByShard
} from './sections';

type BlocksPageProps = {
  searchParams: {
    shard?: string;
    page?: string;
  }
}

export default function BlocksPage({ searchParams }: BlocksPageProps) {
  const shard = searchParams?.shard || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <GeneralBlocksInfo />
      <BlocksByShard shard={shard} currentPage={currentPage} />
    </>
  );
}