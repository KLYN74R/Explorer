'use client';
import { Box, Typography, Button } from '@mui/material';
import { majorMonoDisplay } from '@/styles/theme';

export default function Error() {
  const handleReload = () => {
    window.location.reload();
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
        Something went wrong
      </Typography>
      <Button
        variant="contained"
        onClick={handleReload}
      >
        Try again
      </Button>
    </Box>
  );
};
