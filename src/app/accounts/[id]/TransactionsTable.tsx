'use client';
import React, { ChangeEvent, FC, useState } from 'react';
import { TransactionPreview } from '@/definitions';
import { TRANSACTIONS_PER_PAGE } from '@/constants';
import { truncateMiddle } from '@/helpers';
import { FlexBetweenBox, FlexCenterBox, GeometricButton, LoadMoreButton } from '@/components/ui';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box, TextField,
} from '@mui/material';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import { COLORS } from '@/styles';
import SearchIcon from '@public/icons/ui/search.svg';

type Props = {
  transactions: TransactionPreview[]
}

export const TransactionsTable: FC<Props> = ({
  transactions
}) => {
  const [txs, setTxs] = useState(transactions.slice(0, TRANSACTIONS_PER_PAGE));
  const [query, setQuery] = useState('');
  const nextPage = Math.floor(txs.length / TRANSACTIONS_PER_PAGE) + 1;
  const nextPageAvailable = txs.length < transactions.length;

  const filteredTxs = query ? txs.filter(tx => tx.txid.includes(query)) : txs;

  const handleLoadMore = () => {
    if (nextPageAvailable) {
      setTxs(transactions.slice(0, TRANSACTIONS_PER_PAGE * nextPage));
    }
  }

  const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value.trim());

  if (!transactions.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>No transactions found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mt: 3
      }}>
        <Box sx={{
          width: {
            lg: 'calc(50% - 24px)',
            xs: '100%'
          }
        }}>
          <TransactionSearchBar handleSetQuery={handleSetQuery} />
        </Box>
      </Box>

      <TableContainer sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label='Transactions table'>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='h6'>TxID</Typography></TableCell>
              <TableCell><Typography variant='h6'>TxType</Typography></TableCell>
              <TableCell><Typography variant='h6'>SigType</Typography></TableCell>
              <TableCell><Typography variant='h6'>Fee</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTxs.map((tx) => (
              <TableRow key={tx.txid}>
                <TableCell sx={{ width: '25%' }}>
                  <Link
                    href={`/transactions/${tx.txid}`}
                    passHref
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography color='primary.main' sx={{ fontSize: '16px' }}>
                      <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-4px', height: '20px' }} />{' '}
                      {truncateMiddle(tx.txid)}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell sx={{ width: '25%' }}>
                  <Typography sx={{ fontSize: '16px' }}>{tx.txType}</Typography>
                </TableCell>
                <TableCell sx={{ width: '25%' }}>
                  <Typography sx={{ fontSize: '16px' }}>{tx.sigType}</Typography>
                </TableCell>
                <TableCell sx={{ width: '25%' }}>
                  <Typography sx={{ fontSize: '16px' }}>{tx.fee}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FlexCenterBox sx={{ my: 3 }}>
        {nextPageAvailable && !query && (
          <LoadMoreButton onClick={handleLoadMore}/>
        )}
      </FlexCenterBox>
    </>
  );
}

const TransactionSearchBar = ({
  handleSetQuery
}: {
  handleSetQuery: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <FlexBetweenBox
      border={1}
      borderColor='border.main'
      sx={{
        gap: 2,
        pl: 1.5,
        pr: 0.4,
        background: COLORS.BG_LIGHT
      }}
    >
      <TextField
        onChange={handleSetQuery}
        sx={{ width: '100%' }}
        autoComplete='off'
        spellCheck={false}
        inputProps={{ maxLength: 200 }}
        placeholder='Enter the txID - BLAKE3(KLY) or SHA3(EVM) hash of transaction'
      />
      <GeometricButton
        variant='cyan'
        disableShadow={true}
        sx={{ py: 0.75, cursor: 'default' }}
      >
        <SearchIcon />
      </GeometricButton>
    </FlexBetweenBox>
  );
}