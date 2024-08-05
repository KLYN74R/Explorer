'use client';
import { Inter, Major_Mono_Display } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const majorMonoDisplay = Major_Mono_Display({
  subsets: ['latin'],
  variable: '--font-major-mono-display',
  weight: '400',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7aeee5',
    },
    secondary: {
      main: '#ff3131',
    },
    background: {
      default: '#000',
      paper: '#fff',
    },
    text: {
      primary: '#fefefe',
      secondary: 'rgba(255, 255, 255, 0.4)'
    }
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: inter.style.fontFamily,
      fontSize: '32px',
      fontWeight: 700,
      letterSpacing: '0%',
      lineHeight: '120%',
      textTransform: 'none',
      textDecoration: 'none',
    },
    h2: {
      fontFamily: inter.style.fontFamily,
      fontSize: '24px',
      fontWeight: 500,
      letterSpacing: '0%',
      lineHeight: '32px',
      textTransform: 'none',
      textDecoration: 'none',
    },
    h6: {
      fontFamily: inter.style.fontFamily,
      fontSize: '24px',
      letterSpacing: '0%',
      lineHeight: '130%',
      textTransform: 'none',
      textDecoration: 'none',
    },
    button: {
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      fontWeight: 400,
      letterSpacing: '0%',
      lineHeight: '24px',
      textTransform: 'none',
      textDecoration: 'none',
    },
    body1: {
      fontFamily: inter.style.fontFamily,
      fontSize: '16px',
      fontWeight: 300,
      letterSpacing: '0%',
      lineHeight: '24px',
      textTransform: 'none',
      textDecoration: 'none',
    },
    body2: {
      fontFamily: inter.style.fontFamily,
      fontSize: '14px',
      fontWeight: 300,
      letterSpacing: '0%',
      lineHeight: '150%',
      textTransform: 'none',
      textDecoration: 'none',
    },
    caption: {
      fontFamily: inter.style.fontFamily,
      fontSize: '12px',
      fontWeight: 400,
      letterSpacing: '0%',
      lineHeight: '150%',
      textTransform: 'uppercase',
      textDecoration: 'none',
    }
  }
});

export default theme;
