import * as React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

function createData(
  id: number,
  creator: string,
  txType: string,
  sigType: string,
  fee: number
) {
  return { id, creator, txType, sigType, fee };
}

const transactions = [
  createData(1, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1', 'normType', 'Dadaya', 10),
  createData(2, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_2', 'normType', 'Dadaya', 1),
  createData(3, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_3', 'normType', 'Dadaya', 122),
  createData(4, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_4', 'normType', 'Dadaya', 132),
  createData(5, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_5', 'normType', 'Dadaya', 123),
  createData(6, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_6', 'normType', 'Dadaya', 665),
  createData(7, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_7', 'normType', 'Dadaya', 65541),
  createData(8, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_8', 'normType', 'Dadaya', 7675),
  createData(9, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_9', 'normType', 'Dadaya', 145),
  createData(10, '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_10', 'normType', 'Dadaya', 4444)
];

export const TransactionsTable = () => {
  const isLoading = false;

  if (isLoading) {
    return <TransactionsTableSkeleton />
  }

  return (
    <TableContainer sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label='Transactions table'>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>Creator</Typography></TableCell>
            <TableCell><Typography variant='h6'>TxType</Typography></TableCell>
            <TableCell><Typography variant='h6'>SigType</Typography></TableCell>
            <TableCell><Typography variant='h6'>Fee</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell sx={{ maxWidth: '200px', pr: { xs: 1, sm: 3, lg: 8, xl: 16 } }}>
                <Link
                  href={`/transactions/${tx.id}`}
                  passHref
                  style={{ textDecoration: 'none' }}
                >
                  <Typography color='primary.main' sx={{ fontSize: '18px' }}>
                    <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-5px' }} /> {tx.creator}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell>
                <Typography color='text.secondary' sx={{ fontSize: '18px' }}>{tx.txType}</Typography>
              </TableCell>
              <TableCell>
                <Typography color='text.secondary' sx={{ fontSize: '18px' }}>{tx.sigType}</Typography>
              </TableCell>
              <TableCell>
                <Typography color='text.secondary' sx={{ fontSize: '18px' }}>{tx.fee}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const TransactionsTableSkeleton = () => {
  return (
    <TableContainer sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label='Latest blocks table'>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>Creator</Typography></TableCell>
            <TableCell><Typography variant='h6'>TxType</Typography></TableCell>
            <TableCell><Typography variant='h6'>SigType</Typography></TableCell>
            <TableCell><Typography variant='h6'>Fee</Typography></TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
