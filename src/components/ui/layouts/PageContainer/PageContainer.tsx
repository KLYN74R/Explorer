import { ReactNode } from 'react';
import { Box, Container, SxProps } from '@mui/material';

export const PageContainer = ({
  children,
  sx
}: {
  children: ReactNode,
  sx?: SxProps
}) => {
  return (
    <Container maxWidth='xl' sx={sx}>
      <Box sx={{ px: { md: 4.5, xs: 0 } }}>
        {children}
      </Box>
    </Container>
  );
}