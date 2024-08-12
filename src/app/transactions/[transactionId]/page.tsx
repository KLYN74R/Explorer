import { Box, Container, Typography, Grid } from '@mui/material';
import { BlurredInfoBlock, DimGradientBackground, GradientBackground } from '@/components/ui';
import JsonFormatter from 'react-json-formatter';
import { COLORS } from '@/styles/colors';

type TransactionByIdPageProps = {
  params: {
    transactionId: string
  }
}

const tx = {
  creator: '9GQ46rqY2C7j5Z9GQ46rqY2C7j5ZnBK9GQ46rqY2C7j5ZnBK9GQ46rqY2C7j5ZnBKnBK',
  type: 'TX',
  version: 0,
  txsNumber: 16,
  indexInOwnSequence: 5,
  previousBlockHash: '0123456789abcd89abcdef0123456789abcdef0123456789abcd89abcdef0123456789abcdef',
  status: 'Approved', // or "Awaiting approval",
  payload: {
    "to": "0123456789abcd89abcdef0123456789abcdef0123456789abcd89abcdef0123456789abcdef",
    "amount": 2999,
    "other": {
      "misc": null
    }
  }
}

export default function TransactionByIdPage({ params }: TransactionByIdPageProps) {
  const isApproved = tx.status.toLowerCase().includes('approved');

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
                    comment='Ed25519'
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Version:'
                    value={tx.version}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Type:'
                    value={tx.type}
                    comment='Simple address to address tx'
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Txs number:'
                    value={tx.txsNumber}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Index in own sequence:'
                    value={tx.indexInOwnSequence}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Status:'
                    value={tx.status}
                    variant={`label_${isApproved ? 'green' : 'red'}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BlurredInfoBlock
                    title='Previous block hash:'
                    value={tx.previousBlockHash}
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
          <BlurredInfoBlock title='Payload:'>
            <JsonFormatter
              json={JSON.stringify(tx.payload)}
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