
"use client"; 

import { Provider } from 'react-redux';
import { store } from '@/lib/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    // 3. Pass your imported store to the Provider
    <Provider store={store}>
      {children}
    </Provider>
  );
}