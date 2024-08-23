import { FC } from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { COLORS } from '@/styles';

export const InfoBlock: FC<{
  title: string,
  value?: string | number | Array<any>,
  sx?: SxProps
}> = ({
  title,
  value,
  sx
}) => {
  const content = Array.isArray(value) ? (
    <>
      {value.map(item => (
        <Typography
          key={item}
          sx={{
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: '40px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}
          color='primary.main'
        >
          •︎ {item}
        </Typography>
      ))}
    </>
  ) : (
    <Typography
      sx={{
        fontSize: '32px',
        fontWeight: 800,
        lineHeight: '40px',
        mt: 1,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}
      color='primary.main'
    >
      {value}
    </Typography>
  )

  return (
    <Box sx={{
      pt: 2,
      pb: 2.5,
      pl: 3,
      height: '100%',
      pr: 3,
      background: COLORS.BG_LIGHT,
      ...sx
    }}>
      {content}
      <Typography
        variant='caption'
        color='rgba(255, 255, 255, 0.4)'
        sx={{ display: 'block', mt: 0.5 }}
      >
        {title}
      </Typography>
    </Box>
  );
}