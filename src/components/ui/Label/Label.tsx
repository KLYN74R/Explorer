import { FC, ReactNode } from 'react';
import { SxProps, Typography } from '@mui/material';

export const Label: FC<{
  children: ReactNode,
  variant: 'green' | 'red',
  sx?: SxProps
}> = ({
  children,
  variant,
  sx
}) => {
  return (
    <Typography
      variant='body2'
      color={variant === 'green' ? 'rgba(122, 255, 115, 1)' : 'secondary.main'}
      sx={{
        backgroundColor: variant == 'green' ? 'rgba(41, 51, 41, 1)' : 'rgba(36, 30, 30, 1)',
        px: 1,
        lineHeight: '30px',
        borderRadius: '3px',
        display: 'inline-block',
        ...sx
      }}
    >
      {children}
    </Typography>
  );
}