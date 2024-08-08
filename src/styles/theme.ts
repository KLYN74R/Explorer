'use client';
import { Inter, Major_Mono_Display } from 'next/font/google';
import { createTheme, PaletteOptions } from '@mui/material/styles';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const majorMonoDisplay = Major_Mono_Display({
  subsets: ['latin'],
  variable: '--font-major-mono-display',
  weight: '400',
});

const palette = {
  mode: 'dark',
  primary: {
    main: '#7aeee5',
  },
  secondary: {
    main: '#ff3131',
  },
  border: {
    main: 'rgba(254, 254, 254, 0.2)'
  },
  background: {
    default: '#000',
    paper: '#fff',
  },
  text: {
    primary: '#fefefe',
    secondary: 'rgba(255, 255, 255, 0.4)'
  }
}

const theme = createTheme({
  palette: palette as PaletteOptions,
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
      fontWeight: 400,
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
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthXs: {
          maxWidth: '100%',
        },
        maxWidthSm: {
          maxWidth: '640px',
        },
        maxWidthMd: {
          maxWidth: '768px',
        },
        maxWidthLg: {
          maxWidth: '1024px',
        },
        maxWidthXl: {
          maxWidth: '1280px',
        }
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'standard',
        disableUnderline: true
      },
      styleOverrides: {
        root: {
          fontSize: '14px',
          '& .MuiSelect-icon': {
            position: 'absolute',
            right: 'unset',
            left: '13px',
            top: 'calc(50% - 2px)',
            transform: 'translateY(-50%)'
          },
        }
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: palette.background.default,
          '--Paper-shadow': 'none !important',
          '--Paper-overlay': 'none !important',
          '& .MuiButtonBase-root': {
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderTop: '1px solid',
            borderColor: palette.border.main
          },
          '& .MuiButtonBase-root:nth-child(2)': {
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
          },
          '& .MuiButtonBase-root:last-child': {
            borderBottom: '1px solid',
            borderColor:  palette.border.main,
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
          },
          '& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected': {
            backgroundColor: palette.primary.main,
            color: 'black',
          },
          '& .Mui-selected:hover': {
            cursor: 'default',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        InputProps: {
          disableUnderline: true,
          style: {
            fontSize: '14px'
          }
        },
      },
      styleOverrides: {
        root: {
          fontSize: '14px'
        }
      }
    }
  },
});

export default theme;
