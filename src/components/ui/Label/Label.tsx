import { FC, ReactNode } from 'react';
import { SxProps, Typography } from '@mui/material';

export const Label: FC<{
  children: ReactNode,
  variant: 'green' | 'red' | 'blue',
  sx?: SxProps
}> = ({
  children,
  variant,
  sx
}) => {
  return (
    <Typography
      variant='body2'
      color={variant === 'green' ? 'rgb(122, 255, 115)' : variant === 'red' ? 'secondary.main' : 'primary.main'}
      sx={{
        backgroundColor: variant == 'green' ? 'rgb(41, 51, 41)' : variant === 'red' ? 'rgb(36, 30, 30)' : '#2F3F45',
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