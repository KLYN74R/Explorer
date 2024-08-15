import { FC, ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

export const RedGradientBackground: FC<{
  children: ReactNode,
  sx: SxProps
}> = ({ children, sx }) => {
  return (
    <Box sx={{
      backgroundImage: 'conic-gradient(from 0deg at 100% 50%, #000 9.00000013411045deg, #000 182.23621129989624deg, rgba(255, 49, 49, 0.30) 201.085467338562deg, rgba(0, 0, 0, 0.81) 209.31414127349854deg, rgba(255, 49, 49, 0.43) 220.5308175086975deg, rgba(0, 0, 0, 0.43) 290.7162022590637deg, rgba(255, 49, 49, 0.45) 330.6688642501831deg, rgba(0, 0, 0, 0.94) 335.7163739204407deg, rgba(255, 49, 49, 0.47) 344.38218355178833deg, rgba(255, 49, 49, 0.45) 348.0183792114258deg, rgba(255, 49, 49, 0.30) 354.3228578567505deg)',
      ...sx
    }}>
      {children}
    </Box>
  );
}