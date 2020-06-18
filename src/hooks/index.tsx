import React from 'react';

import { AuthProvider } from './auth';
import { StatusBarProvider } from './statusBar';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <StatusBarProvider>{children}</StatusBarProvider>
  </AuthProvider>
);

export default AppProvider;
