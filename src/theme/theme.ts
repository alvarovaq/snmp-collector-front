import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CAF9',
      light: '#BBDEFB',
      dark: '#42A5F5',
      contrastText: '#000000',
    },
    secondary: {
      main: '#C8E6C9',
      light: '#F1F8E9',
      dark: '#A5D6A7',
      contrastText: '#000000',
    },
    error: {
      main: '#EF9A9A',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.8rem',
      fontWeight: 600,
      color: '#90CAF9',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'inherit',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          boxShadow: '0 1px 1px rgba(255, 255, 255, 0.05)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
        containedPrimary: {
          boxShadow: '0 3px 6px rgba(144, 202, 249, 0.2)',
        },
      },
    },
  },
});

export default darkTheme;