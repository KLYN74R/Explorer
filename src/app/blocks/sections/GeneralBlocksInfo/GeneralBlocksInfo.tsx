import { Container, Grid, Box, Typography } from '@mui/material';
import { InfoBlock } from '@/components/ui';
import { TransactionsChart } from './TransactionsChart';
import { fetchBlockchainData } from '@/data';

// Last 14 epoches
const transactionsPerEpochData = [
  { epochIndex: 14, transactionsNum: 33008 },
  { epochIndex: 13, transactionsNum: 35000 },
  { epochIndex: 12, transactionsNum: 39487 },
  { epochIndex: 11, transactionsNum: 32234 },
  { epochIndex: 10, transactionsNum: 35559 },
  { epochIndex: 9, transactionsNum: 33421 },
  { epochIndex: 8, transactionsNum: 40443 },
  { epochIndex: 7, transactionsNum: 39330 },
  { epochIndex: 6, transactionsNum: 42223 },
  { epochIndex: 5, transactionsNum: 35110 },
  { epochIndex: 4, transactionsNum: 36440 },
  { epochIndex: 3, transactionsNum: 37135 },
  { epochIndex: 2, transactionsNum: 35110 },
  { epochIndex: 1, transactionsNum: 32442 }
].reverse();

export const GeneralBlocksInfo = async () => {
  const data = await fetchBlockchainData();

  return (
    <Container maxWidth='xl' sx={{ py: 6 }}>
      <Box sx={{ px: { md: 4.5, xs: 0 } }}>
        <Typography variant='h1'>General info about blocks</Typography>
        <Typography sx={{ mt: 1 }}>For this epoch and during the whole time</Typography>

        <Box sx={{ mt: 5, minHeight: '300px' }}>
          <TransactionsChart data={transactionsPerEpochData} />
        </Box>

        <Grid container xs={12} spacing={1}>
          <Grid item xs={12} md={4}>
            <InfoBlock
              title='Total blocks'
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
              title='Slot time(block time)'
              value={`${data.slotTimeInSeconds}s`}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );

}