import React, { FC, ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';

export const GradientBackground: FC<{ children: ReactNode, blur?: boolean } & BoxProps> = ({
  children,
  sx = {},
  blur = false,
  ...rest
}) => {
  return (
    <Box
      {...rest}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...sx
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'conic-gradient(from 0deg at 50% 50%, rgba(63, 241, 230, 0.4) 0deg, #000000 9deg, rgba(63, 241, 230, 0.2) 27deg, #000000 41.4deg, rgba(63, 241, 230, 0.2) 46.42deg, rgba(63, 241, 230, 0.4) 70.2deg, rgba(0, 0, 0, 0.982673) 78.57deg, rgba(4, 17, 16, 0.942196) 98.12deg, rgba(7, 27, 26, 0.916895) 110.34deg, rgba(9, 34, 33, 0.899844) 118.58deg, rgba(12, 48, 46, 0.867504) 134.2deg, rgba(0, 0, 0, 0.847582) 143.82deg, rgba(18, 68, 65, 0.817868) 158.17deg, rgba(21, 82, 78, 0.784645) 174.22deg, rgba(0, 0, 0, 0.768041) 182.24deg, rgba(255, 49, 49, 0.15) 192.04deg, rgba(255, 49, 49, 0.3) 201.09deg, rgba(0, 0, 0, 0.711979) 209.31deg, rgba(255, 49, 49, 0.24) 221.13deg, rgba(255, 49, 49, 0.651619) 247.03deg, rgba(0, 0, 0, 0.622859) 264.18deg, rgba(0, 0, 0, 0.573749) 276.08deg, rgba(0, 0, 0, 0.540387) 292.19deg, rgba(255, 49, 49, 0.514313) 304.79deg, rgba(0, 0, 0, 0.488336) 317.33deg, rgba(255, 49, 49, 0.466545) 327.86deg, rgba(255, 49, 49, 0.447981) 336.83deg, rgba(255, 49, 49, 0.3) 348.43deg, rgba(63, 241, 230, 0.4) 360deg)',
          zIndex: -1,
          ...(blur && { filter: 'blur(40px)' })
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};
