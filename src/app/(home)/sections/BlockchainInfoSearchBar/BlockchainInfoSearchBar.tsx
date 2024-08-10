import { FC } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { GradientBackground, DimGradientBackground } from '@/components/ui';
import { BlurredInfoBlock } from '@/components/ui';
import { ExplorerSearchBar } from './ExplorerSearchBar';

export const BlockchainInfoSearchBar = () => {
  return (
    <DimGradientBackground>
      <GradientBackground sx={{ pt: 6, pb: 14 }}>
        <Container maxWidth='xl'>
          <Box sx={{ px: { md: 4.5, xs: 0 } }}>
            <ExplorerSearchBar />
          </Box>
          <Grid container spacing={1} sx={{ mt: 4, px: { md: 4.5, xs: 0 } }}>
            <InfoBlock title='Total TXS' value='2.37B' />
            <InfoBlock title='Epoch ID' value='101' />
            <InfoBlock title='TXS Success' value='98%' />
            <InfoBlock title='Shards' value='100' />
            <InfoBlock title='Validators' value='1337' />
            <InfoBlock title='Total Staked' value='1.4B' />
            <InfoBlock title='Market Cap' value='1.2B' variant='cyan'/>
            <InfoBlock title='Coin Price' value='$1.28' variant='cyan'/>
          </Grid>
        </Container>
      </GradientBackground>
    </DimGradientBackground>
  );
}

const InfoBlock: FC<{ title: string, value: string | number, variant?: string }> = ({
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