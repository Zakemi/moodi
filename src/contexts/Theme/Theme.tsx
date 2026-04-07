import { createContext, ReactNode, useContext, useMemo } from 'react';
import { defaultTheme } from './constants';
import { Theme } from './types';

export const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(() => defaultTheme, []);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
