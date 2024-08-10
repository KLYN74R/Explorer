import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import DoubleArrowDown from '@public/icons/ui/doubleArrowDown.svg';

export const LoadMoreButton: FC<{
  disabled?: boolean
}> = ({
  disabled
}) => {
  return (
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
  );
}