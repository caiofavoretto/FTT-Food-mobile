import React, { createContext, useContext, useCallback, useState } from 'react';
import { StatusBar } from 'react-native';

interface StatusBarContextData {
  setToLight(): void;
  setToDark(): void;
}

const StatusBarContext = createContext<StatusBarContextData>(
  {} as StatusBarContextData,
);

const StatusBarProvider: React.FC = ({ children }) => {
  const [barStyle, setBarStyle] = useState<'light-content' | 'dark-content'>(
    'light-content',
  );

  const setToLight = useCallback(() => {
    setBarStyle('light-content');
  }, []);

  const setToDark = useCallback(() => {
    setBarStyle('dark-content');
  }, []);

  return (
    <StatusBarContext.Provider value={{ setToLight, setToDark }}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={barStyle}
        translucent
      />
      {children}
    </StatusBarContext.Provider>
  );
};

function useStatusBar(): StatusBarContextData {
  const context = useContext(StatusBarContext);

  if (!context) {
    throw new Error('useStatusBar must be used within a StatusBarProvider');
  }

  return context;
}

export { StatusBarProvider, useStatusBar };
