import { Metadata } from 'next';
import { Box, Container, Typography, Grid } from '@mui/material';
import { PrettyJSON } from '@/components';
import {
  DimGradientBackground,
  GradientBackground,
  BlurredInfoBlock,
  Label
} from '@/components/ui';
import { getTransactionByBlake3Hash } from '@/helpers/data';

type TransactionByIdPageProps = {
  params: {
    hash: string
  }
}

export const metadata: Metadata = {
  title: 'Transaction info',
};

export default async function TransactionByIdPage({ params }: TransactionByIdPageProps) {
  const blake3Hash = decodeURIComponent(params.hash);
  const tx = await getTransactionByBlake3Hash(blake3Hash);

  return (
    <>
      <DimGradientBackground>
        <GradientBackground sx={{ pt: 7, pb: 1 }}>
          <Container maxWidth='xl'>
            <Box sx={{ px: { md: 4.5, xs: 0 } }}>
              <Typography variant='h1'>Transaction info</Typography>

              <Grid container spacing={1} sx={{ mt: 5 }}>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Creator:'
                    value={tx.creator}
                    comment={tx.creatorFormat}
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Version:'
                    value={tx.v}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Type:'
                    value={tx.type}
                    comment={tx.typeDescription}
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Nonce: '
                    value={tx.nonce}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BlurredInfoBlock
                    title='Signature:'
                    value={tx.sig}
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BlurredInfoBlock
                    title='256 bit Blake3 hash:'
                    value={blake3Hash}
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Included in block:'
                    value={tx.blockID}
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Position in block:'
                    value={tx.order}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BlurredInfoBlock title='Status:'>
                    <Label variant={tx.isOk ? 'green' : 'red'}>
                      {tx.isOk ? 'Success' : 'Failed'}
                    </Label>
                  </BlurredInfoBlock>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </GradientBackground>
      </DimGradientBackground>

      <Container maxWidth='xl' sx={{ pb: 7 }}>
        <Box sx={{ px: { md: 4.5, xs: 0 } }}>
          <BlurredInfoBlock title='Payload:'>
            <PrettyJSON data={tx.payload} />
          </BlurredInfoBlock>
        </Box>
      </Container>
    </>
  );
}