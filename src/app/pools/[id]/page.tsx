import { Metadata } from 'next';
import { ContentBlock, DimGradientBackground, GradientBackground } from '@/components/ui';
import { Box, Container, Grid, Typography } from '@mui/material';
import { PrettyJSON } from '@/components';
import { fetchPoolById } from '@/data';

type PoolByIdPageProps = {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Pool info',
};

export default async function PoolByIdPage({ params }: PoolByIdPageProps) {
  const poolId = decodeURIComponent(params.id);
  const pool = await fetchPoolById(poolId);

  return (
    <>
      <DimGradientBackground>
        <GradientBackground sx={{ pt: 7, pb: 1 }}>
          <Container maxWidth='xl'>
            <Box sx={{ px: { md: 4.5, xs: 0 } }}>
              <Typography variant='h1'>Pool Data</Typography>
              <Grid container spacing={1} sx={{ mt: 5 }}>
                <Grid item xs={12}>
                  <ContentBlock
                    title='Pool Id:'
                    value={poolId}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </GradientBackground>
      </DimGradientBackground>

      <Container maxWidth='xl' sx={{ pb: 7 }}>
        <Box sx={{ px: { md: 4.5, xs: 0 } }}>
          <ContentBlock title='Pool data:'>
            <PrettyJSON data={pool} />
          </ContentBlock>
        </Box>
      </Container>
    </>
  );
}