'use client';
import Link from 'next/link';
import { useQueryPage } from '@/hooks';
import { IconButton, SxProps, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { FlexCenterBox } from '@/components/ui';

type PaginationProps = {
  pageIsEmpty: boolean;
  sx?: SxProps;
};

export const ArrowPagination = ({ pageIsEmpty, sx }: PaginationProps) => {
  const {
    currentPage,
    createPageURL
  } = useQueryPage();

  return (
    <FlexCenterBox sx={sx}>
      <Link
        href={createPageURL(currentPage - 1)}
        passHref
        scroll={false}
        style={{ cursor: currentPage <= 1 ? 'default' : 'pointer' }}
      >
        <IconButton
          disabled={currentPage <= 1}
          aria-label='Previous Page'
          color='primary'
        >
          <ArrowLeft />
        </IconButton>
      </Link>

      <Typography sx={{ mx: 2 }}>
        Page {currentPage}
      </Typography>

      <Link
        href={createPageURL(currentPage +1)}
        passHref
        scroll={false}
        style={{ cursor: pageIsEmpty ? 'default' : 'pointer' }}
      >
        <IconButton
          disabled={pageIsEmpty}
          aria-label='Next Page'
          color='primary'
        >
          <ArrowRight />
        </IconButton>
      </Link>
    </FlexCenterBox>
  );
}
