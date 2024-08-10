import '@mui/material/styles';

// Extending the Palette and PaletteOptions interfaces to include custom properties
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
}
