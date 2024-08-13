import { BlurredInfoBlock, DimGradientBackground, GradientBackground } from '@/components/ui';
import { Box, Container, Grid, Typography } from '@mui/material';
import { PrettyJSON } from '@/components';

type PoolByIdPageProps = {
  params: {
    poolId: string;
  }
}

const poolData = {
  "some_proof": {
    "some_statement": "PROOF"
  }
}

export default function PoolByIdPage({ params }: PoolByIdPageProps) {
  return (
    <>
      <DimGradientBackground>
        <GradientBackground sx={{ pt: 7, pb: 1 }}>
          <Container maxWidth='xl'>
            <Box sx={{ px: { md: 4.5, xs: 0 } }}>
              <Typography variant='h1'>Pool Data</Typography>
              <Grid container spacing={1} sx={{ mt: 5 }}>
                <Grid item xs={12}>
                  <BlurredInfoBlock
                    title='Pool Id:'
                    value={params.poolId}
                    variant='cyan'
                    breakWord={true}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </GradientBackground>
      </DimGradientBackground>

      <Container maxWidth='xl' sx={{ pb: 7 }}>
        <Box sx={{ px: { md: 4.5, xs: 0 } }}>
          <BlurredInfoBlock title='Pool data:'>
            <PrettyJSON data={poolData} />
          </BlurredInfoBlock>
        </Box>
      </Container>
    </>
  );
}