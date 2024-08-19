import { FC } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { GradientBackground, DimGradientBackground } from '@/components/ui';
import { BlurredInfoBlock } from '@/components/ui';
import { ExplorerSearchBar } from './ExplorerSearchBar';
import { fetchGeneralBlockchainData } from '@/helpers/data';

export const BlockchainInfoSearchBar = async () => {
  const {
    totalTxsNumber,
    epochId,
    txsSuccess,
    shardsNumber,
    validatorsNumber,
    totalStaked
  } = await fetchGeneralBlockchainData();

  return (
    <DimGradientBackground>
      <GradientBackground sx={{ pt: 6, pb: 14 }}>
        <Container maxWidth='xl'>
          <Box sx={{ px: { md: 4.5, xs: 0 } }}>
            <ExplorerSearchBar />
          </Box>
          <Grid container spacing={1} sx={{ mt: 4, px: { md: 4.5, xs: 0 } }}>
            <InfoBlock title='Total TXS' value={totalTxsNumber} />
            <InfoBlock title='Epoch ID' value={epochId} />
            <InfoBlock title='TXS Success' value={txsSuccess} variant='cyan' />
            <InfoBlock title='Shards' value={shardsNumber} />
            <InfoBlock title='Validators' value={validatorsNumber} />
            <InfoBlock title='Total Staked' value={totalStaked} />
            <InfoBlock title='Market Cap' value='WIP' variant='cyan'/>
            <InfoBlock title='Coin Price' value='WIP' variant='cyan'/>
          </Grid>
        </Container>
      </GradientBackground>
    </DimGradientBackground>
  );
}

const InfoBlock: FC<{ title: string, value: string | number, variant?: 'cyan' }> = ({
  title,
  value,
  variant
}) => {
  return (
    <Grid item lg={1.5} md={3} sm={4} xs={12}>
      <BlurredInfoBlock title={title} value={value} variant={variant} />
    </Grid>
  );
}