import { Metadata } from 'next';
import { ContentBlock } from '@/components/ui';
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
    <Container maxWidth='xl' sx={{ py: 6 }}>
      <Box sx={{ px: { md: 4.5, xs: 0 } }}>
        <Typography variant='h1'>Aggregated Finalization Proof (AFP)</Typography>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <ContentBlock
              title='Block Id:'
              value={finalizationProof.blockID}
              url={`/blocks/${finalizationProof.blockID}`}
            />
          </Grid>
          <Grid item xs={12}>
            <ContentBlock>
              <PrettyJSON data={finalizationProof} />
            </ContentBlock>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}