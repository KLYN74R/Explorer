'use client';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const CodeSnippet = styled(Box)(({ theme }) => ({
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius,
  color: '#FFF',
  boxShadow: theme.shadows[4]
}));