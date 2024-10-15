import { Metadata } from 'next';
import {
  GeneralBlocksInfo,
  BlocksByShard
} from './sections';

interface Props {
  searchParams: {
    shard?: string;
    page?: string;
  }
}

export const metadata: Metadata = {
  title: 'Blocks',
};

export default function BlocksPage({ searchParams }: Props) {
  const shard = searchParams?.shard || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <GeneralBlocksInfo />
      <BlocksByShard shard={shard} currentPage={currentPage} />
    </>
  );
}