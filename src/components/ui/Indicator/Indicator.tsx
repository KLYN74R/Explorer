import { FC } from 'react';
import { Box } from '@mui/material';
import { COLORS } from '@/styles';

interface Props {
  color?: string
}

export const Indicator: FC<Props> = ({ color = COLORS.GREEN }) => {
  return (
    <Box
      sx={{
        width: '6px',
        height: '6px',
        borderRadius: '3px',
        background: color,
        mr: 1.5
      }}
    />
  );
}