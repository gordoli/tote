import React from 'react';
// import { useStorageState } from './useStorageState';

export const AuthContext = React.createContext<{
  login: (token: string) => void;
  logout: () => void;
  session: string | null;
}>({
  login: () => null,
  logout: () => null,
  session: null,
});
