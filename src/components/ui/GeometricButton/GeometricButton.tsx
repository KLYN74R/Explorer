'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import { Box, Button, SxProps, useTheme } from '@mui/material';
import styles from './geometric-button.module.css';
import clsx from 'clsx';

export type GeometricButtonProps = {
  children: React.ReactNode;
  url?: string;
  variant?: 'white' | 'black';
  isActive?: boolean;
  sx?: SxProps;
};

export const GeometricButton: FC<GeometricButtonProps> = ({
  children,
  url,
  variant = 'black',
  isActive = false,
  sx
}) => {
  const theme = useTheme();

  const isLink = !!url;
  const isLight = variant === 'white';

  const buttonProps = {
    sx: {
      py: 1.5,
      px: 1.5,
      cursor: isActive ? 'cursor-default' : 'cursor-pointer',
      color: theme.palette.text.primary,
      ...sx
    },
    className: clsx(
      styles.geometricButton,
      isLight ? styles.geometricButtonWhite : ''
    ),
    ...(isLink ? {
      href: url,
      component: Link
    } : {
      component: 'button'
    })
  }

  return (
    <Box
      className={clsx(
        styles.geometricButtonShadow,
        isActive ? styles.geometricButtonShadowActive : ''
      )}
      sx={{
        pr: 0.5,
        pb: 0.5,
        mt: 0.5
      }}
    >
      <Button {...buttonProps} disableRipple>
        {children}
      </Button>
    </Box>
  );
};
