'use client';
import React, { FC, useState } from 'react';
import { Stakers } from '@/definitions';
import { STAKERS_PER_PAGE } from '@/constants';
import { truncateMiddle } from '@/helpers';
import { FlexCenterBox, LoadMoreButton } from '@/components/ui';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';

const getTableData = (poolStakers: Stakers) => {
  return Object.entries(poolStakers).map(
    ([id, { kly, uno }]) => ({
      id,
      kly,
      uno,
      total: kly + uno,
    })
  );
}

type StakersTableProps = {
  poolStakers: Stakers
}

export const StakersTable: FC<StakersTableProps> = ({
  poolStakers
}) => {
  const tableStakers = getTableData(poolStakers);

  const [stakers, setStakers] = useState(tableStakers.slice(0, STAKERS_PER_PAGE));
  const nextPage = Math.floor(stakers.length / STAKERS_PER_PAGE) + 1;
  const nextPageAvailable = stakers.length < tableStakers.length;


  const handleLoadMore = () => {
    if (nextPageAvailable) {
      setStakers(tableStakers.slice(0, STAKERS_PER_PAGE * nextPage));
    }
  }

  if (!tableStakers.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>No stakers found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label='Stakers table'>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='h6'>ID</Typography></TableCell>
              <TableCell><Typography variant='h6'>KLY</Typography></TableCell>
              <TableCell><Typography variant='h6'>UNO</Typography></TableCell>
              <TableCell><Typography variant='h6'>Total</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stakers.map((st) => (
              <TableRow key={st.id}>
                <TableCell sx={{ width: '31%' }}>
                  <Typography color='primary.main' sx={{ fontSize: '16px' }}>{truncateMiddle(st.id)}</Typography>
                </TableCell>
                <TableCell sx={{ width: '23%' }}>
                  <Typography sx={{ fontSize: '16px' }}>{st.kly}</Typography>
                </TableCell>
                <TableCell sx={{ width: '23%' }}>
                  <Typography sx={{ fontSize: '16px' }}>{st.uno}</Typography>
                </TableCell>
                <TableCell sx={{ width: '23%' }}>
                  <Typography color='primary.main' sx={{ fontSize: '16px' }}>{st.total}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FlexCenterBox sx={{ my: 3 }}>
        {nextPageAvailable && (
          <LoadMoreButton onClick={handleLoadMore}/>
        )}
      </FlexCenterBox>
    </>
  );
}