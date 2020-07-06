import React, { createContext, useContext, useCallback, useState } from 'react';
import { StatusBar } from 'react-native';

interface ThemeContextData {
  setToLightTheme(): void;
  setToDarkTheme(): void;
  getCurrentTheme(): 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const setToLightTheme = useCallback(() => {
    setTheme('light');
  }, []);

  const setToDarkTheme = useCallback(() => {
    setTheme('dark');
  }, []);

  const getCurrentTheme = useCallback(() => {
    return theme;
  }, []);

  return (
    <ThemeContext.Provider
      value={{ setToLightTheme, setToDarkTheme, getCurrentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
