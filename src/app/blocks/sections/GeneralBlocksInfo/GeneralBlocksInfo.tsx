import { Grid, Box, Typography } from '@mui/material';
import { InfoBlock, PageContainer } from '@/components/ui';
import { TransactionsChart } from './TransactionsChart';
import { fetchBlockchainData, fetchRecentTotalBlocksAndTxs } from '@/data';

export const GeneralBlocksInfo = async () => {
  const data = await fetchBlockchainData();
  const recentBlockStats = await fetchRecentTotalBlocksAndTxs();

  return (
    <PageContainer sx={{ py: 6 }}>
      <Typography variant='h1'>General info about blocks</Typography>
      <Typography sx={{ mt: 1 }}>For this epoch and during the whole time</Typography>

      <Box sx={{ mt: 5, minHeight: '300px' }}>
        <TransactionsChart recentBlockStats={recentBlockStats} />
      </Box>

      <Grid container xs={12} spacing={1}>
        <Grid item xs={12} md={4}>
          <InfoBlock
            title='Blocks during the whole time'
            value={data.totalBlocksNumber}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoBlock
            title='Blocks in this epoch'
            value={data.totalBlocksNumberInCurrentEpoch}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoBlock
            title='Slot time (block time)'
            value={`${data.slotTimeInSeconds}s`}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );

}