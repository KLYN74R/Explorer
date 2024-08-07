import { Box, Container } from '@mui/material';
import { GradientBackground } from '@/components/ui';
import { ExplorerSearchBar } from '@/components';

export const BlockchainInfoSearchBar = () => {
  return (
    <GradientBackground blur={true} sx={{ py: 6 }}>
      <Container maxWidth='xl'>
        <Box sx={{ px: 4.5 }}>
          <ExplorerSearchBar />
        </Box>
      </Container>
    </GradientBackground>
  );
}