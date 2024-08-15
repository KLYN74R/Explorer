import { FC } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import { TransactionWithBlake3Hash } from '@/definitions';

type TransactionsTableProps = {
  transactions: TransactionWithBlake3Hash[]
}

export const TransactionsTable: FC<TransactionsTableProps> = ({
  transactions
}) => {
  const isEVM = (tx: TransactionWithBlake3Hash) => !tx.creator;
  const transactionsExist = !!transactions.length;

  if (!transactionsExist) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>Block contains no transactions.</Typography>
      </Box>
    );
  }

  return (
    <>
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
              <TableRow key={tx.sig}>
                <TableCell sx={{ maxWidth: '200px', pr: { xs: 1, sm: 3, lg: 8, xl: 16 } }}>
                  <Link
                    href={`/transactions/${tx.blake3Hash}`}
                    passHref
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography color='primary.main' sx={{ fontSize: '18px' }}>
                      <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-5px' }} />
                      {' '}
                      {isEVM(tx) ? tx.payload.from : tx.creator}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography color='text.secondary' sx={{ fontSize: '18px' }}>
                    {isEVM(tx) ? 'ECDSA' : tx.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color='text.secondary' sx={{ fontSize: '18px' }}>
                    {tx.payload.sigType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color='text.secondary' sx={{ fontSize: '18px' }}>
                    {tx.fee}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Load More /> (Block can contain about 200 transactions) */}
    </>
  );
}
