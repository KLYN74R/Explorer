import { FC } from 'react';
import { Box, SxProps, Typography } from '@mui/material';

export const BlurredInfoBlock: FC<{
  title: string,
  value: string | number,
  variant?: string,
  breakWord?: boolean,
  sx?: SxProps
}> = ({
  title,
  value,
  variant,
  breakWord,
  sx
}) => {
  const isLabel = variant?.includes('label');

  return (
    <Box sx={{
      pt: 2,
      pb: 2.5,
      pl: 3,
      ...(breakWord && { pr: 3 }),
      background: '#11111166',
      backdropFilter: 'blur(5px)',
      ...sx
    }}>
      <Typography
        variant='caption'
        sx={{ display: 'block' }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: isLabel ? '14px' : '24px',
          lineHeight: '30px',
          mt: 1,
          ...(breakWord && {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }),
          ...(isLabel && {
            backgroundColor: variant?.includes('green') ? 'rgba(41, 51, 41, 1)' :
              variant?.includes('red') ? 'rgba(74, 13, 13, 1)' : 'transparent',
            px: 1,
            borderRadius: '3px',
            display: 'inline-block'
          })
        }}
        color={variant === 'cyan' ? 'primary.main' :
          variant?.includes('green') ? 'rgba(122, 255, 115, 1)' : 'secondary.main'}
      >
        {value}
      </Typography>
    </Box>
  );
}