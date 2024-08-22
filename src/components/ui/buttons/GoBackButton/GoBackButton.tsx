import { FC } from 'react';
import Link from 'next/link';
import ArrowLeft from '@public/icons/ui/arrowLeft.svg';
import { Box, IconButton, SxProps, Typography } from '@mui/material';

type Props = {
  url: string;
  label?: string;
  sx?: SxProps
  disabled?: boolean;
}

export const GoBackButton: FC<Props> = ({ url, label, sx, disabled }) => {
  const button = (
    <Link
      href={url}
      passHref
      scroll={false}
      aria-disabled={disabled}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <IconButton
        aria-label='Previous Page'
        color='primary'
        sx={{ px: 1.5, py: 1 }}
        disabled={disabled}
      >
        <ArrowLeft />
      </IconButton>
    </Link>
  );

  if (label) {
    return (
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1,
        ...sx
      }}>
        {button}
        <Typography variant='body2'>{label}</Typography>
      </Box>
    );
  }

  return button;
}