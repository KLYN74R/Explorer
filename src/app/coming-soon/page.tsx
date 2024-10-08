'use client';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';

const ComingSoonPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '75vh'
      }}
    >
      <Typography variant='h6' sx={{ mb: 4 }}>
        Page coming soon...
      </Typography>
      <Button variant='contained' onClick={handleGoBack}>
        Go Back
      </Button>
    </Box>
  );
};

export default ComingSoonPage;
