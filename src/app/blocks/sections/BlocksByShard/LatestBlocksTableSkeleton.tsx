import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export const LatestBlocksTableSkeleton = () => {
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