import { Metadata } from 'next';
import { ContentBlock } from '@/components/ui';
import { Box, Container, Grid, Typography } from '@mui/material';
import { PrettyJSON } from '@/components';
import { fetchAggregatedFinalizationProof } from '@/data';

type AggregatedFinalizationProofPageProps = {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Aggregated Finalization Proof',
};

export default async function AggregatedFinalizationProofPage({ params }: AggregatedFinalizationProofPageProps) {
  const id = decodeURIComponent(params.id);
  const aggregatedFinalizationProof = await fetchAggregatedFinalizationProof(id);

  return (
    <Container maxWidth='xl' sx={{ py: 6 }}>
      <Box sx={{ px: { md: 4.5, xs: 0 } }}>
        <Typography variant='h1'>Aggregated Finalization Proof (AFP)</Typography>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <ContentBlock
              title='Block Id:'
              value={aggregatedFinalizationProof.blockID}
              url={`/blocks/${aggregatedFinalizationProof.blockID}`}
            />
          </Grid>
          <Grid item xs={12}>
            <ContentBlock>
              <PrettyJSON data={aggregatedFinalizationProof} />
            </ContentBlock>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}