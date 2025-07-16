import { createTheme } from '@mui/material/styles';

// Define color palettes for different gym themes
export const gymThemes = {
  default: {
    primary: '#1976d2',
    secondary: '#dc004e',
    accent: '#ff5722'
  },
  dark: {
    primary: '#90caf9',
    secondary: '#f48fb1',
    accent: '#ffab91'
  },
  powerhouse: {
    primary: '#d32f2f',
    secondary: '#ff9800',
    accent: '#4caf50'
  },
  zen: {
    primary: '#4caf50',
    secondary: '#8bc34a',
    accent: '#cddc39'
  },
  ocean: {
    primary: '#0277bd',
    secondary: '#00acc1',
    accent: '#26c6da'
  }
};

export const createCustomTheme = (mode, gymTheme = 'default', customColors = {}) => {
  const colors = { ...gymThemes[gymTheme], ...customColors };

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        light: mode === 'light' ? colors.primary + '40' : colors.primary + '80',
        dark: mode === 'light' ? colors.primary + '80' : colors.primary + '40',
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: mode === 'light' ? '#fafafa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#333333' : '#ffffff',
        secondary: mode === 'light' ? '#666666' : '#b3b3b3',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Segoe UI", "Arial", sans-serif',
      h1: {
        fontWeight: 300,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 400,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 500,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light' 
              ? '0 2px 8px rgba(0,0,0,0.1)' 
              : '0 2px 8px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: mode === 'light' 
                ? '0 4px 16px rgba(0,0,0,0.15)' 
                : '0 4px 16px rgba(0,0,0,0.4)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 500,
            padding: '10px 20px',
          },
          contained: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            border: 'none',
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });
};

export default createCustomTheme;
