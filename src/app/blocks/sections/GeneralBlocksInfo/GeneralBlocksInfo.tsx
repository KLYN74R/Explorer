import { Container, Grid, Box, Typography } from '@mui/material';
import { DimGradientBackground, GradientBackground } from '@/components';
import { BlurredInfoBlock} from '@/components/ui';
import { TransactionsChart } from './TransactionsChart';

const transactionsPerEpochData = [
  { epochIndex: 20, transactionsNum: 200 },
  { epochIndex: 19, transactionsNum: 431 },
  { epochIndex: 18, transactionsNum: 300 },
  { epochIndex: 17, transactionsNum: 340 },
  { epochIndex: 16, transactionsNum: 562 },
  { epochIndex: 15, transactionsNum: 315 },
  { epochIndex: 14, transactionsNum: 298 },
  { epochIndex: 13, transactionsNum: 300 },
  { epochIndex: 12, transactionsNum: 487 },
  { epochIndex: 11, transactionsNum: 524 },
  { epochIndex: 10, transactionsNum: 599 },
  { epochIndex: 9, transactionsNum: 321 },
  { epochIndex: 8, transactionsNum: 403 },
  { epochIndex: 7, transactionsNum: 500 },
  { epochIndex: 6, transactionsNum: 423 },
  { epochIndex: 5, transactionsNum: 350 },
  { epochIndex: 4, transactionsNum: 450 },
  { epochIndex: 3, transactionsNum: 375 },
  { epochIndex: 2, transactionsNum: 490 },
  { epochIndex: 1, transactionsNum: 322 }
].reverse();

export const GeneralBlocksInfo = () => {
  return (
    <DimGradientBackground>
      <GradientBackground sx={{ pt: 6, pb: 6 }}>
        <Container maxWidth='xl'>
          <Grid container spacing={10} sx={{ pl: { md: 4.5, xs: 0 } }}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant='h1'>General info about blocks</Typography>
                <Typography sx={{ mt: 1 }}>For this epoch and during the whole time</Typography>

                <Grid container spacing={1} sx={{ mt: 3 }}>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <BlurredInfoBlock title='Total blocks' value={123456} variant='cyan' sx={{ flex: 1 }} />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <BlurredInfoBlock title='Blocks in this epoch' value={228} />
                    <BlurredInfoBlock title='Slot time(block time)' value='1s' />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ minHeight: '500px' }}>
              <Typography variant='caption' sx={{ display: 'block', textAlign: 'center', fontSize: '18px', mb: 1 }}>Transaction Volume per Epoch</Typography>
              <TransactionsChart data={transactionsPerEpochData} />
            </Grid>
          </Grid>
        </Container>
      </GradientBackground>
    </DimGradientBackground>
  );

}