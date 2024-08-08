'use client'
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import { majorMonoDisplay } from '@/styles/theme';

const ErrorPage: FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '75vh',
      }}
    >
      <Typography variant="h1" sx={{
        mb: 2,
        fontFamily: majorMonoDisplay.style.fontFamily,
        fontSize: '36px'
      }}>
        500
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Internal Server Error
      </Typography>
      <Button variant="contained" onClick={handleGoHome}>
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
