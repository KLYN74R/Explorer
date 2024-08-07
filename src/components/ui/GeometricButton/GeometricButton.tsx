'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import { Box, Button, SxProps, useTheme } from '@mui/material';
import styles from './geometric-button.module.css';
import clsx from 'clsx';

export type GeometricButtonProps = {
  children: React.ReactNode;
  url?: string;
  variant?: 'white' | 'cyan' | 'black';
  isActive?: boolean;
  sx?: SxProps;
  disableShadow?: boolean;
  onClick?: () => void;
};

export const GeometricButton: FC<GeometricButtonProps> = ({
  children,
  url,
  variant = 'black',
  isActive = false,
  sx,
  disableShadow = false,
  onClick
}) => {
  const theme = useTheme();

  const isLink = !!url;

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
      variant === 'white' ? styles.geometricButtonWhite :
        variant === 'cyan' ? styles.geometricButtonCyan : ''
    ),
    ...(isLink ? {
      href: url,
      component: Link
    } : {
      component: 'button',
      onClick
    })
  }

  return (
    <Box
      className={clsx(
        styles.geometricButtonShadow,
        variant === 'cyan' ? styles.geometricButtonShadowCyan : '',
        isActive ? styles.geometricButtonShadowActive : '',
        disableShadow ? styles.geometricButtonShadowDisabled : ''
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
