import React, { createContext, useState, ReactNode } from 'react';
import checkIsUserAuthenticated from '../lib/Auth';
import { AppContextValue } from '../types';

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(checkIsUserAuthenticated());

  const contextValue: AppContextValue = {
    authentication: [isAuthenticated, setAuthenticated]
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};