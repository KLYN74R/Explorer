import { FC } from 'react';
import Link from 'next/link';
import { Box, IconButton, SxProps, Typography } from '@mui/material';
import ArrowLeft from '@public/icons/ui/arrowLeft.svg';
import ArrowRight from '@public/icons/ui/arrowRight.svg';

interface Props {
  url: string;
  variant: 'back' | 'forward',
  label?: string;
  sx?: SxProps
  disabled?: boolean;
}

export const NavButton: FC<Props> = ({ url, variant, label, sx, disabled }) => {
  const isPrev = variant === 'back';

  const button = (
    <Link
      href={url}
      passHref
      scroll={false}
      aria-disabled={disabled}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <IconButton
        aria-label={label}
        color='primary'
        sx={{ px: 1.5, py: 1 }}
        disabled={disabled}
      >
        {isPrev ? <ArrowLeft/> : <ArrowRight/>}
      </IconButton>
    </Link>
  );

  if (label) {
    return (
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1,
        ...sx
      }}>
        {isPrev ? (
          <>
            {button}
            <Typography variant='body2'>{label}</Typography>
          </>
        ) : (
          <>
            <Typography variant='body2'>{label}</Typography>
            {button}
          </>
        )}
      </Box>

    );
  }

  return button;
}