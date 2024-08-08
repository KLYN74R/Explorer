import { FC, ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

export const GreenGradientBackground: FC<{
  children: ReactNode,
  sx: SxProps
}> = ({ children, sx }) => {
  return (
    <Box sx={{
      backgroundImage: 'conic-gradient(from 0deg at 0% 100%, rgba(63, 241, 230, 0.133) 0deg, #000000 9deg, rgba(63, 241, 230, 0.067) 27deg, #000000 41.4deg, rgba(63, 241, 230, 0.067) 46.42deg, rgba(63, 241, 230, 0.133) 70.2deg, rgba(0, 0, 0, 0.327) 78.57deg, rgba(4, 17, 16, 0.314) 98.12deg, rgba(7, 27, 26, 0.306) 110.34deg, rgba(9, 34, 33, 0.3) 118.58deg, rgba(12, 48, 46, 0.289) 134.2deg, rgba(0, 0, 0, 0.283) 143.82deg, rgba(18, 68, 65, 0.273) 158.17deg, rgba(21, 82, 78, 0.262) 174.22deg, rgba(0, 0, 0, 0.256) 182.24deg, rgba(255, 49, 49, 0.05) 192.04deg, rgba(255, 49, 49, 0.1) 201.09deg, rgba(0, 0, 0, 0.237) 209.31deg, rgba(255, 49, 49, 0.08) 221.13deg, rgba(255, 49, 49, 0.217) 247.03deg, rgba(0, 0, 0, 0.208) 264.18deg, rgba(0, 0, 0, 0.191) 276.08deg, rgba(0, 0, 0, 0.18) 292.19deg, rgba(255, 49, 49, 0.171) 304.79deg, rgba(0, 0, 0, 0.163) 317.33deg, rgba(255, 49, 49, 0.156) 327.86deg, rgba(255, 49, 49, 0.149) 336.83deg, rgba(255, 49, 49, 0.1) 348.43deg, rgba(63, 241, 230, 0.133) 360deg)',
      ...sx
    }}>
      {children}
    </Box>
  );
}