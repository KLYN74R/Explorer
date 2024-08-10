import {
  BlurredInfoBlock,
  DimGradientBackground,
  FlexCenterBox,
  GradientBackground,
  LoadMoreButton
} from '@/components/ui';
import { Container, Grid, Box, Typography } from '@mui/material';
import { TransactionsTable } from './TransactionsTable';
import BlockImage from '@public/block.svg';

type BlockByIdPageProps = {
  params: {
    blockId: string
  }
}

const block = {
  creator: '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_1',
  time: '15:36:24 Jun 24, 2024 GMT+3:00',
  epoch: '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK_Ep0cH',
  txsNumber: 10,
  indexInOwnSequence: 15,
  previousBlockHash: '9GQ46rqY238sadasdasdasdsafdadsadadsadsasadd1213213H',
  status: 'Approved' // or "Awaiting approval"
}

export default function BlockByIdPage({ params }: BlockByIdPageProps) {
  const isApproved = block.status.toLowerCase().includes('approved');

  return (
    <>
      <DimGradientBackground>
        <GradientBackground sx={{ py: 7 }}>
          <Container maxWidth='xl'>
            <Grid container sx={{ pl: { md: 4.5, xs: 0 } }} spacing={8}>
              <Grid item xs={12} lg={4} xl={3.5} sx={{
                display: 'flex',
                justifyContent: { xs: 'center', lg: 'flex-start' }
              }}>
                <BlockImage width={366} height={366} viewBox='0 0 366 366' />
              </Grid>
              <Grid item xs={12} lg={8} xl={8.5}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <BlurredInfoBlock title='Creator:' value={block.creator} breakWord={true} />
                  </Grid>
                  <Grid item xs={12}>
                    <BlurredInfoBlock title='Time:' value={block.time} breakWord={true} />
                  </Grid>
                  <Grid item xs={12}>
                    <BlurredInfoBlock title='Epoch:' value={block.epoch} breakWord={true} />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>
                    <BlurredInfoBlock
                      title='Txs Number:'
                      value={block.txsNumber}
                      variant='cyan'
                      sx={{ width: '50%' }}
                      breakWord={true}
                    />
                    <BlurredInfoBlock
                      title='Index in own sequence:'
                      value={block.indexInOwnSequence}
                      variant='cyan'
                      sx={{ width: '50%' }}
                      breakWord={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <BlurredInfoBlock title='Previous block hash:' value={block.previousBlockHash} breakWord={true}/>
                  </Grid>

                  <Grid item xs={12}>
                    <BlurredInfoBlock
                      title='Status:'
                      value={block.status}
                      variant={`label_${isApproved ? 'green' : 'red'}`}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </GradientBackground>
      </DimGradientBackground>

      <Container maxWidth='xl'>
        <Box sx={{
          pt: 5,
          pl: { md: 4.5, xs: 0 },
        }}>
          <Typography variant='h1'>Transactions</Typography>
          <TransactionsTable />
          <FlexCenterBox sx={{ mt: 3 }}>
            <LoadMoreButton disabled={false} />
          </FlexCenterBox>
        </Box>
      </Container>
    </>
  );
}