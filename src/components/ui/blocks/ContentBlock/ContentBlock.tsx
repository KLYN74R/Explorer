import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Box, SxProps, Typography } from '@mui/material';
import { BG_COLORS } from '@/styles';
import LaunchIcon from '@mui/icons-material/Launch';

export const ContentBlock: FC<{
  children?: ReactNode,
  title?: string,
  url?: string;
  comment?: string,
  value?: string | number,
  variant?: 'red',
  blurred?: boolean,
  sx?: SxProps
}> = ({
  children,
  title,
  url,
  comment,
  value,
  variant,
  blurred = false,
  sx
}) => {
  const heroText = (
    <Typography
      sx={{
        fontSize: '24px',
        lineHeight: '30px',
        fontWeight: 300,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        display: 'inline'
      }}
      color={variant === 'red' ? 'secondary.main' : 'primary.main'}
    >
      {value}<br/>
      {comment && <Comment text={comment} />}
    </Typography>
  );

  return (
    <Box sx={{
      pt: 2,
      pb: 2.5,
      pl: 3,
      height: '100%',
      pr: 3,
      background: blurred ? 'rgba(17, 17, 17, 0.4)' : BG_COLORS.GRAY_LIGHT,
      ...(blurred && { backdropFilter: 'blur(5px)' }),
      ...sx
    }}>
      {title && (
        <Typography
          variant='caption'
          color='text.primary'
          sx={{ display: 'block', mb: 1 }}
        >
          {title}
        </Typography>
      )}
      {children ? (
        <Box sx={{ mt: 1 }}>
          {children}
        </Box>
      ) : (
        <>
          {url ? (
            <LinkWrapper url={url}>{heroText}</LinkWrapper>
          ) : heroText}
        </>
      )}
    </Box>
  );
}

const LinkWrapper = ({
  children,
  url
}: {
  children: ReactNode,
  url: string
}) => {
  return (
    <Link
      href={url}
      passHref
      style={{
        textDecoration: 'none',
        cursor: 'pointer'
      }}
    >
      <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-4px', display: 'inline' }} />{' '}
      {children}
    </Link>
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