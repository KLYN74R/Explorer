'use client';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const FlexCenterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const FlexBetweenBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export { FlexCenterBox, FlexBetweenBox };
