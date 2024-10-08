import { FC, ReactNode } from 'react';
import { SxProps, Typography } from '@mui/material';
import { BG_COLORS, COLORS } from '@/styles';

export const Label: FC<{
  children: ReactNode,
  variant: 'green' | 'red' | 'blue' | 'orange' | 'silver',
  sx?: SxProps
}> = ({
  children,
  variant,
  sx
}) => {
  return (
    <Typography
      variant='body2'
      color={
        variant === 'green' ? COLORS.GREEN :
          variant === 'red' ? COLORS.RED :
            variant === 'blue' ? COLORS.CYAN :
              variant === 'orange' ? COLORS.ORANGE :
                COLORS.SILVER
      }
      sx={{
        backgroundColor: variant === 'green' ? BG_COLORS.GREEN :
          variant === 'red' ? BG_COLORS.RED :
            variant === 'blue' ? BG_COLORS.CYAN :
              variant === 'orange' ? BG_COLORS.ORANGE :
                BG_COLORS.SILVER,
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