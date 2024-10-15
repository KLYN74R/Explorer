import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import DoubleArrowDown from '@public/icons/ui/doubleArrowDown.svg';

interface LoadMoreButtonProps {
  onClick: () => void;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        pr: 2,
        pl: 2.5,
        py: 1
    }}
    >
      <Typography sx={{ mr: 1 }}>
        Load more
      </Typography>
      <DoubleArrowDown/>
    </Button>
  );
}