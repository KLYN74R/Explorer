import { FC, ReactNode } from 'react';
import { Box, SxProps, Typography } from '@mui/material';

export const BlurredInfoBlock: FC<{
  children?: ReactNode,
  title: string,
  comment?: string,
  value?: string | number,
  variant?: 'cyan',
  breakWord?: boolean,
  sx?: SxProps
}> = ({
  children,
  title,
  comment,
  value,
  variant,
  breakWord,
  sx
}) => {
  return (
    <Box sx={{
      pt: 2,
      pb: 2.5,
      pl: 3,
      height: '100%',
      ...(breakWord && { pr: 3 }),
      background: '#11111166',
      backdropFilter: 'blur(5px)',
      ...sx
    }}>
      <Typography
        variant='caption'
        color='text.primary'
        sx={{ display: 'block' }}
      >
        {title}
      </Typography>
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
            ...(breakWord && {
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }),
          }}
          color={variant === 'cyan' ? 'primary.main' : 'secondary.main'}
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