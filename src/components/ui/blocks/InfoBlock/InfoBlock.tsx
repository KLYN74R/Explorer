import { FC } from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { COLORS } from '@/styles';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

type InfoBlockProps = {
  title: string,
  value?: string | number | Array<string|{text: string; url: string;}>,
  sx?: SxProps
}

export const InfoBlock: FC<InfoBlockProps> = ({
  title,
  value,
  sx
}) => {
  const isArray = Array.isArray(value);

  const paragraphSx = {
    fontSize: isArray ? '24px' : '32px',
    fontWeight: isArray ? 500 : 800,
    lineHeight: '40px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    ...(!isArray && { mt: 1 })
  }

  const content = isArray ?
    value.map(item => {
      return typeof item === 'object' ? (
        <Link
          href={item.url}
          passHref
          style={{textDecoration: 'none'}}
          key={item.url}
        >
          <Typography
            key={item.text}
            sx={paragraphSx}
            color='primary.main'
          >
            •︎ {item.text}
            <LaunchIcon sx={{position: 'relative', bottom: '-4px', height: '24px', ml: '5px'}}/>
          </Typography>
        </Link>
      ) : (
        <Typography
          key={item}
          sx={paragraphSx}
          color='primary.main'
        >
          •︎ {item}
        </Typography>
      )
    })
  : (
    <Typography
      sx={paragraphSx}
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