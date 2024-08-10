import { Button, Typography } from '@mui/material';
import DoubleArrowDown from '@public/icons/ui/doubleArrowDown.svg';

export const LoadMoreButton = () => {
  return (
    <Button sx={{ px: 2, py: 1 }}>
      <Typography color='text.primary' sx={{ mr: 1 }}>
        Load More
      </Typography>
      <DoubleArrowDown />
    </Button>
  );
}