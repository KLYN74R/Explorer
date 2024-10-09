import React from 'react';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: {
      main: string;
    };
    background: {
      default: string;
      light: string;
      paper: string;
    };
  }

  interface PaletteOptions {
    border?: {
      main?: string;
    };
    background?: {
      default: string;
      paper: string;
      light?: string;
    };
  }

  interface TypeBackground {
    default: string;
    light: string;
    paper: string;
  }

  interface TypographyVariants {
    monospace: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    monospace?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    monospace: true;
  }
}
