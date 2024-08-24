import { FC, Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { ShardSearchBar } from './ShardSearchBar';
import { LatestBlocksTable } from './LatestBlocksTable';
import { LatestBlocksTableSkeleton } from './LatestBlocksTableSkeleton';
import { fetchCurrentShards } from '@/data';

type BlocksByShardProps = {
  shard: string;
  currentPage: number
}

export const BlocksByShard: FC<BlocksByShardProps> = async ({
  shard,
  currentPage
}: BlocksByShardProps) => {
  const shards = await fetchCurrentShards();

  const shardOptions = shards.map(shard => ({
    label: shard,
    value: shard
  }));

  return (
    <Container maxWidth='xl' sx={{ mt: 3 }}>
      <Box sx={{
        px: { md: 4.5, xs: 0 }
      }}>
        <Typography variant='h1'>Shard selector</Typography>
        <Typography sx={{ mt: 1, mb: 3 }}>Choose a shard ID to visualize blocks and stats per shard in linear way</Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Box sx={{
            width: {
              xl: 'calc(50% - 24px)',
              md: '75%',
              xs: '100%'
            }
          }}>
            <ShardSearchBar shardsList={shardOptions} />
          </Box>
        </Box>
        <Suspense key={shard + currentPage} fallback={<LatestBlocksTableSkeleton />}>
          <LatestBlocksTable shard={shard} currentPage={currentPage} />
        </Suspense>
      </Box>
    </Container>
  );
}