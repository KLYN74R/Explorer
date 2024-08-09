import { Box, Container, Typography } from '@mui/material';
import { ShardSearchBar } from './ShardSearchBar';

const fetchedShards = [
  { label: '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', value: 'val1' },
  { label: '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_2', value: 'val2' },
  { label: '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_3', value: 'val3' },
];

export const BlocksByShard = () => {
  return (
    <Container maxWidth='xl'>
      <Box sx={{
        pl: { md: 4.5, xs: 0 },
        width: {
          xl: 'calc(50% - 24px)',
          md: '75%',
          xs: '100%'
        }
      }}>
        <Typography variant='h1'>Shard selector</Typography>
        <Typography sx={{ mt: 1, mb: 3 }}>Choose a shard ID to visualize blocks and stats per shard in linear way</Typography>
        <ShardSearchBar shardsList={fetchedShards} />
      </Box>
    </Container>
  );
}