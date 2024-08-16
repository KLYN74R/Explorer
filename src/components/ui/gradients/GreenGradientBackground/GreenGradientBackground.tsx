import { FC, ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

export const GreenGradientBackground: FC<{
  children: ReactNode,
  sx: SxProps
}> = ({ children, sx }) => {
  return (
    <Box sx={{
      backgroundImage: 'conic-gradient(from 0deg at 0% 50%, rgba(63, 241, 230, 0.40) 0deg, rgba(63, 241, 230, 0.20) 6.86470091342926deg, rgba(63, 241, 230, 0.20) 15.51906019449234deg, rgba(63, 241, 230, 0.28) 22.20238208770752deg, rgba(4, 17, 16, 0.25) 53.301785588264465deg, rgba(7, 27, 26, 0.92) 110.33955574035645deg, rgba(9, 34, 33, 0.90) 118.5753321647644deg, rgba(12, 48, 46, 0.87) 134.19573426246643deg, rgba(18, 68, 65, 0.82) 158.16977977752686deg, rgba(21, 82, 78, 0.78) 174.21644926071167deg, rgba(0, 0, 0, 0.77) 182.23621129989624deg)',
      ...sx
    }}>
      {children}
    </Box>
  );
}