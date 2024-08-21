'use client';
import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import DoubleArrowDown from '@public/icons/ui/doubleArrowDown.svg';
import { useQueryParams } from '@/hooks';
import Link from 'next/link';

export const ButtonPagination: FC<{
  disabled?: boolean;
}> = ({
  disabled
}) => {
  const {
    pathname,
    searchParams,
    page: currentPage
  } = useQueryParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber > 1 ? String(pageNumber) : String(1));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Link
      href={createPageURL(currentPage +1)}
      passHref
      scroll={false}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <Button
        disabled={disabled}
        sx={{
          pr: 2,
          pl: 2.5,
          py: 1
        }}
      >
        <Typography
          color={disabled ? 'text.secondary' : 'text.primary'}
          sx={{ mr: 1 }}
        >
          Load More
        </Typography>
        <DoubleArrowDown style={{
          opacity: disabled ? 0.6 : 1
        }}/>
      </Button>
    </Link>
  );
}