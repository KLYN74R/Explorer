'use client';
import { Inter, Major_Mono_Display } from 'next/font/google';
import { createTheme, PaletteOptions } from '@mui/material/styles';

export const inter = Inter({
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
    light: 'rgba(17, 17, 17, 0.6)',
    paper: '#fff',
  },
  text: {
    primary: '#fefefe',
    secondary: 'rgba(255, 255, 255, 0.6)'
  }
}

const theme = createTheme({
  palette: palette as PaletteOptions,
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: inter.style.fontFamily,
      fontSize: '32px',
      fontWeight: 800,
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
      fontWeight: 500,
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
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.main + 20,
          color: palette.text.primary,
          borderRadius: '3px',
          transition: 'background-color 200ms',
          '&:hover': {
            backgroundColor: palette.primary.main + 30,
          },
          '&.Mui-disabled': {
            backgroundColor: palette.primary.main + 5,
            cursor: 'default'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.main + 25,
          borderRadius: '3px',
          transition: 'background-color 200ms',
          '&:hover': {
            backgroundColor: palette.primary.main + 35,
          },
          '&.Mui-disabled': {
            backgroundColor: palette.primary.main + 35,
            cursor: 'default',
            opacity: 0.35
          }
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        InputProps: {
          disableUnderline: true,
          style: {
            height: '48px',
          }
        },
      },
      styleOverrides: {
        root: {
          fontSize: '16px',
          height: '48px',
          '& .MuiInputBase-root': {
            height: '48px'
          },
          '& .MuiInputBase-input': {
            fontSize: '16px'
          },
          '& .MuiInputBase-root:before': {
            borderBottom: 'transparent',
          }
        }
      }
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
          background: palette.background.default,
          '&:hover': {
            background: '#001c1c',
          }
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'transparent',
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
            backgroundColor: '#002a2a'
          },
          '& .Mui-selected:hover': {
            cursor: 'default',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiFormControl-root': {
            display: 'flex',
            justifyContent: 'center'
          }
        },
        paper: {
          fontSize: '16px',
          backgroundColor: palette.background.default,
          '--Paper-shadow': 'none !important',
          '--Paper-overlay': 'none !important',
          '& .MuiAutocomplete-option': {
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderTop: '1px solid',
            borderColor: palette.border.main
          },
          '& .MuiAutocomplete-option:firstChild': {
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
          },
          '& .MuiAutocomplete-option:last-child': {
            borderBottom: '1px solid',
            borderColor:  palette.border.main,
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
          },
          '& .MuiAutocomplete-noOptions': {
            border: '1px solid',
            borderColor: palette.border.main,
            borderRadius: '5px'
          }
        },
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background.light,
          backdropFilter: 'blur(5px)'
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background.default,
          borderBottom: `1px solid ${palette.border.main}`
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          '& .MuiTypography-root': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        },
      },
    }
  },
});

export default theme;
