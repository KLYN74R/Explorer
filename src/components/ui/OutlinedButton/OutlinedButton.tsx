'use client';
import React, { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

type OutlinedButtonProps = {
  icon?: React.ReactElement;
  text?: string;
  url?: string;
  onClick?: () => void;
  sx?: ButtonProps['sx']
};

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.border.main,
  color: theme.palette.text.primary,
  borderWidth: '1px',
  borderRadius: 0,
  width: '44px',
  height: '44px',
  minWidth: '44px',
  padding: 0
}));

export const OutlinedButton: FC<OutlinedButtonProps> = ({
  icon,
  text,
  url = '',
  onClick,
  sx
}) => {
  const isLink = !!url;

  const props = {
    sx,
    variant: 'outlined',
    ...(isLink ? {
      component: Link,
      href: url,
    } : {
      component: 'button',
      onClick
    }),
  }

  return (
    // @ts-ignore
    <StyledButton {...props}>
      {icon && icon}
      {text && text}
    </StyledButton>
  );
};