import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';

import { FC, PropsWithChildren } from 'react';

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => (
  <NotistackSnackbarProvider
    maxSnack={2}
    autoHideDuration={3000}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    dense
    preventDuplicate
  >
    {children}
  </NotistackSnackbarProvider>
);
