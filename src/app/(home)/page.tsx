import { Metadata } from 'next';
import * as React from 'react';
import { Container, Grid } from '@mui/material';
import {
  BlockchainInfoSearchBar,
  KeyWordsTicker,
  NetworkParameters,
  NetworkStatus
} from './sections';
import { fetchBlockchainData } from '@/data';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const blockchainData = await fetchBlockchainData();

  return (
    <>
      <BlockchainInfoSearchBar data={blockchainData} />
      <KeyWordsTicker />
      <Container maxWidth='xl' sx={{ pt: 14, pb: 20 }}>
        <Grid container spacing={5} sx={{ px: { md: 4.5, xs: 0 } }}>
          <Grid item xs={12} lg={6}>
            <NetworkParameters data={blockchainData} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <NetworkStatus data={blockchainData} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
