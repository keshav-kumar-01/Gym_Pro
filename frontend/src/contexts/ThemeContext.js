import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createCustomTheme } from '../theme/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const [gymTheme, setGymTheme] = useState(() => {
    const savedTheme = localStorage.getItem('gymTheme');
    return savedTheme || 'default';
  });

  const [customColors, setCustomColors] = useState(() => {
    const saved = localStorage.getItem('customColors');
    return saved ? JSON.parse(saved) : {};
  });

  const [gymBranding, setGymBranding] = useState(() => {
    const saved = localStorage.getItem('gymBranding');
    return saved ? JSON.parse(saved) : {
      name: 'FitLife Gym',
      logo: null,
      slogan: 'Transform Your Life'
    };
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('gymTheme', gymTheme);
  }, [gymTheme]);

  useEffect(() => {
    localStorage.setItem('customColors', JSON.stringify(customColors));
  }, [customColors]);

  useEffect(() => {
    localStorage.setItem('gymBranding', JSON.stringify(gymBranding));
  }, [gymBranding]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const changeGymTheme = (newTheme) => {
    setGymTheme(newTheme);
  };

  const updateCustomColors = (colors) => {
    setCustomColors(colors);
  };

  const updateGymBranding = (branding) => {
    setGymBranding(prev => ({ ...prev, ...branding }));
  };

  const theme = createCustomTheme(mode, gymTheme, customColors);

  const value = {
    mode,
    gymTheme,
    customColors,
    gymBranding,
    toggleColorMode,
    changeGymTheme,
    updateCustomColors,
    updateGymBranding,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
