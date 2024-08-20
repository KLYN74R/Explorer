import { FC } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from 'next/link';
import { fetchBlocksByShard } from '@/helpers/data';
import { BlockPreview } from '@/definitions';
import { FlexCenterBox, ButtonPagination } from '@/components/ui';
import { BLOCKS_PER_PAGE } from '@/helpers/constants';

type LatestBlocksTableProps = {
  shard: string;
  currentPage: number;
}

export const LatestBlocksTable: FC<LatestBlocksTableProps> = async ({
  shard,
  currentPage
}) => {
  const blocks = await fetchBlocksByShard(shard, currentPage);
  const blocksExist = !!blocks.length;

  const rows = blocks.map((block: BlockPreview) => (
    <TableRow key={block.sid}>
      <TableCell sx={{ maxWidth: { xs: '225px', md: '275px', xl: '375px' } }}>
        <Link
          href={`/blocks/${block.id}`}
          passHref
          style={{ textDecoration: 'none' }}
        >
          <Typography color='primary.main' sx={{ fontSize: '18px' }}>
            <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-5px' }} /> {block.sid}
          </Typography>
        </Link>
      </TableCell>
      <TableCell sx={{ maxWidth: { xs: '225px', lg: '275px', xl: 'none' } }}>
        <Typography color='text.secondary' sx={{ fontSize: '18px' }}>{block.creator}</Typography>
      </TableCell>
      <TableCell sx={{ minWidth: '150px' }}>
        <Typography color='text.secondary' sx={{ fontSize: '18px' }}>{block.index}</Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: '100px' }}>
        <Typography color='text.secondary' sx={{ fontSize: '18px' }}>{block.txsNumber}</Typography>
      </TableCell>
      <TableCell>
        <Typography color='text.secondary' sx={{ fontSize: '18px' }}>{block.createdAt}</Typography>
      </TableCell>
    </TableRow>
  ));

  if (!blocksExist) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>No blocks found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label='Latest blocks table'>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='h6'>SID</Typography></TableCell>
              <TableCell><Typography variant='h6'>Creator</Typography></TableCell>
              <TableCell><Typography variant='h6'>Index</Typography></TableCell>
              <TableCell><Typography variant='h6'>Txs Number</Typography></TableCell>
              <TableCell><Typography variant='h6'>Created at</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </TableContainer>

      <FlexCenterBox sx={{ my: 3 }}>
        <ButtonPagination
          disabled={blocks.length < BLOCKS_PER_PAGE}
        />
      </FlexCenterBox>
    </>
  );
}
