'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
