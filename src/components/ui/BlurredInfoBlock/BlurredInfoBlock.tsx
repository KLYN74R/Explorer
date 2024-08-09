import { FC } from 'react';
import { Box, SxProps, Typography } from '@mui/material';

export const BlurredInfoBlock: FC<{ title: string, value: string | number, variant?: string, sx?: SxProps }> = ({
  title,
  value,
  variant,
  sx
}) => {
  return (
    <Box sx={{
      pt: 1.5,
      pb: 2.5,
      pl: 3,
      background: '#11111166',
      backdropFilter: 'blur(5px)',
      ...sx
    }}>
      <Typography variant='caption'>
        {title.toUpperCase()}
      </Typography>
      <Typography
        sx={{ fontSize: '24px', mt: 1 }}
        color={variant === 'cyan' ? 'primary.main' : 'secondary.main'}
      >
        {value}
      </Typography>
    </Box>
  );
}