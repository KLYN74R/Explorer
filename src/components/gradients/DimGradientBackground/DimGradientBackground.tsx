import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

export const DimGradientBackground: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box sx={{
      backgroundImage: 'linear-gradient(180deg, transparent 64%, rgba(0, 0, 0, 1) 100%)'
    }}>
      {children}
    </Box>
  );
}