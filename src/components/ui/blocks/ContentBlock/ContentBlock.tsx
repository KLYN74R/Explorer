import { FC, ReactNode } from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { COLORS } from '@/styles';

export const ContentBlock: FC<{
  children?: ReactNode,
  title?: string,
  comment?: string,
  value?: string | number,
  variant?: 'red',
  blurred?: boolean,
  sx?: SxProps
}> = ({
  children,
  title,
  comment,
  value,
  variant,
  blurred = false,
  sx
}) => {
  return (
    <Box sx={{
      pt: 2,
      pb: 2.5,
      pl: 3,
      height: '100%',
      pr: 3,
      background: blurred ? 'rgba(17, 17, 17, 0.4)' : COLORS.BG_LIGHT,
      ...(blurred && { backdropFilter: 'blur(5px)' }),
      ...sx
    }}>
      {title && (
        <Typography
          variant='caption'
          color='text.primary'
          sx={{ display: 'block' }}
        >
          {title}
        </Typography>
      )}
      {children ? (
        <Box sx={{ mt: 1 }}>
          {children}
        </Box>
      ) : (
        <Typography
          sx={{
            fontSize: '24px',
            lineHeight: '30px',
            fontWeight: 300,
            mt: 1,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
          color={variant === 'red' ? 'secondary.main' : 'primary.main'}
        >
          {value} {comment && <Comment text={comment} />}
        </Typography>
      )}
    </Box>
  );
}

const Comment: FC<{ text: string }> = ({ text }) => {
  return (
    <Typography
      color='text.secondary'
      sx={{ fontSize: '24px', lineHeight: '30px', fontWeight: 300 }}
      component='span'
    >
      ({text})
    </Typography>
  );
}