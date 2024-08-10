import * as React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';
import Link from 'next/link';

function createData(
  blockId: number,
  sid: string,
  creator: string,
  index: number,
  txsNumber: number,
  createdAt: string,
) {
  return { blockId, sid, creator, index, txsNumber, createdAt };
}

const blocks = [
  createData(1, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024'),
  createData(2, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_2', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024'),
  createData(3, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_3', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024'),
  createData(4, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_4', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024'),
  createData(5, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_5', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024'),
  createData(6, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_6', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024'),
  createData(7, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_7', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024'),
  createData(8, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_8', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024'),
  createData(9, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_9', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024'),
  createData(10, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_10', '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 123, 10, '15:39 Jun 22, 2024')
];

export const LatestBlocksTable = () => {
  const isLoading = false;

  if (isLoading) {
    return <LatestBlocksTableSkeleton />
  }

  return (
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
          {blocks.map((block) => (
            <TableRow key={block.blockId}>
              <TableCell sx={{ maxWidth: { xs: '200px', md: '250px', xl: '350px' } }}>
                <Link
                  href={`/blocks/${block.sid}`}
                  passHref
                  style={{ textDecoration: 'none' }}
                >
                  <Typography color='primary.main'>{block.sid}</Typography>
                </Link>
              </TableCell>
              <TableCell sx={{ maxWidth: { xs: '250px', lg: '300px', xl: 'none' } }}>
                <Typography color='primary.main'>{block.creator}</Typography>
              </TableCell>
              <TableCell sx={{ minWidth: '150px' }}>
                <Typography color='text.secondary'>{block.index}</Typography>
              </TableCell>
              <TableCell sx={{ maxWidth: '100px' }}>
                <Typography color='text.secondary'>{block.txsNumber}</Typography>
              </TableCell>
              <TableCell>
                <Typography color='text.secondary'>{block.createdAt}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const LatestBlocksTableSkeleton = () => {
  return (
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
          {[...Array(10)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant='text' width='100%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='100%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='100%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='100%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='100%' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
