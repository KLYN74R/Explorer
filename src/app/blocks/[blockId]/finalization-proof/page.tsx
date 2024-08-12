import { BlurredInfoBlock, DimGradientBackground, GradientBackground } from '@/components/ui';
import { Box, Container, Grid, Typography } from '@mui/material';
import JsonFormatter from 'react-json-formatter';
import { COLORS } from '@/styles/colors';

type FinalizationProofPageProps = {
  params: {
    blockId: string;
  }
}

const finalizationProof = {
  "some_proof": {
    "some_statement": "PROOF"
  }
}

export default function FinalizationProofPage({ params }: FinalizationProofPageProps) {
  return (
    <>
      <DimGradientBackground>
        <GradientBackground sx={{ pt: 7, pb: 1 }}>
          <Container maxWidth='xl'>
            <Box sx={{ px: { md: 4.5, xs: 0 } }}>
              <Typography variant='h1'>Block Finalization Proof</Typography>
              <Grid container spacing={1} sx={{ mt: 5 }}>
                <Grid item xs={12}>
                  <BlurredInfoBlock
                    title='Block Id:'
                    value={params.blockId}
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
          <BlurredInfoBlock title='Finalization proof:'>
            <JsonFormatter
              json={JSON.stringify(finalizationProof)}
              tabWith={4}
              jsonStyle={{
                style: {
                  fontFamily: 'monospace',
                  width: '100%',
                  overflow: 'auto'
                },
                numberStyle: {color: COLORS.CYAN},
                nullStyle: {color: COLORS.RED},
                propertyStyle: {color: 'rgba(255, 255, 255, 0.8)'}
              }}
            />
          </BlurredInfoBlock>
        </Box>
      </Container>
    </>
  );
}