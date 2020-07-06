import React from 'react';

import { AuthProvider } from './auth';
import { StatusBarProvider } from './statusBar';
import { ThemeProvider } from './theme';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <StatusBarProvider>{children}</StatusBarProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default AppProvider;
