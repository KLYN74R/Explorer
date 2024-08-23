import { Metadata } from 'next';
import { ContentBlock, DimGradientBackground, GradientBackground } from '@/components/ui';
import { Box, Container, Grid, Typography } from '@mui/material';
import { PrettyJSON } from '@/components';
import { fetchFinalizationProof } from '@/data';

type FinalizationProofPageProps = {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Aggregated Finalization Proof',
};

export default async function FinalizationProofPage({ params }: FinalizationProofPageProps) {
  const id = decodeURIComponent(params.id);
  const finalizationProof = await fetchFinalizationProof(id);

  return (
    <>
      <DimGradientBackground>
        <GradientBackground sx={{ pt: 7, pb: 1 }}>
          <Container maxWidth='xl'>
            <Box sx={{ px: { md: 4.5, xs: 0 } }}>
              <Typography variant='h1'>Aggregated Finalization Proof</Typography>
              <Grid container spacing={1} sx={{ mt: 5 }}>
                <Grid item xs={12}>
                  <ContentBlock
                    title='Block Id:'
                    value={finalizationProof.blockID}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </GradientBackground>
      </DimGradientBackground>

      <Container maxWidth='xl' sx={{ pb: 7 }}>
        <Box sx={{ px: { md: 4.5, xs: 0 } }}>
          <ContentBlock title='Aggregated finalization proof:'>
            <PrettyJSON data={finalizationProof} />
          </ContentBlock>
        </Box>
      </Container>
    </>
  );
}