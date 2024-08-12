import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

export const Label: FC<{
  children: ReactNode,
  variant: 'green' | 'red',
}> = ({
  children,
  variant
}) => {
  return (
    <Typography
      variant='body2'
      color={variant === 'green' ? 'rgba(122, 255, 115, 1)' : 'secondary.main'}
      sx={{
        backgroundColor: variant == 'green' ? 'rgba(41, 51, 41, 1)' : 'rgba(74, 13, 13, 1)',
        px: 1,
        lineHeight: '30px',
        borderRadius: '3px',
        display: 'inline-block'
      }}
    >
      {children}
    </Typography>
  );
}