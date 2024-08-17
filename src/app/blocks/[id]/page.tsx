import Link from 'next/link';
import {
  BlurredInfoBlock,
  DimGradientBackground,
  GradientBackground,
  Label,
} from '@/components/ui';
import { Container, Grid, Box, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { TransactionsTable } from './TransactionsTable';
import { getBlockById } from '@/helpers/data';
import BlockImage from '@public/block.svg';

type BlockByIdPageProps = {
  params: {
    id: string
  }
}

export default async function BlockByIdPage({ params }: BlockByIdPageProps) {
  const id = decodeURIComponent(params.id);
  const block = await getBlockById(id);

  const status = !!block.finalizationProof.proofs ? 'Approved' : 'Awaiting approval';

  return (
    <>
      <DimGradientBackground>
        <GradientBackground sx={{ py: 7 }}>
          <Container maxWidth='xl'>
            <Grid container sx={{ px: { md: 4.5, xs: 0 } }} spacing={8}>
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
                    <BlurredInfoBlock title='Created at:' value={block.createdAt} breakWord={true} />
                  </Grid>
                  <Grid item xs={12}>
                    <BlurredInfoBlock title='Epoch:' value={block.epochIndex} breakWord={true} />
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
                      value={block.index}
                      variant='cyan'
                      sx={{ width: '50%' }}
                      breakWord={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <BlurredInfoBlock title='Previous block hash:' value={block.prevHash} breakWord={true}/>
                  </Grid>

                  <Grid item xs={12}>
                    <BlurredInfoBlock title='Status:'>
                      <Label variant={status === 'Approved' ? 'green' : 'red'}>
                        {status}
                      </Label>
                      <Box sx={{ mt: 1 }}>
                        <Link
                          href={`/blocks/${id}/finalization-proof`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Typography variant='caption' color='primary.main'>
                            <LaunchIcon
                              color='primary'
                              sx={{ fontSize: '16px', position: 'relative', bottom: '-3px' }}
                            /> Check finalization proof
                          </Typography>
                        </Link>
                      </Box>
                    </BlurredInfoBlock>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </GradientBackground>
      </DimGradientBackground>

      <Container maxWidth='xl'>
        <Box sx={{ px: { md: 4.5, xs: 0 } }}>
          <Typography variant='h1'>Transactions</Typography>
          <TransactionsTable transactions={block.transactions} />
        </Box>
      </Container>
    </>
  );
}