import { QueryProvider } from 'providers/QueryProvider';
import { SnackbarProvider } from 'providers/SnackbarProvider';
import { StateProvider } from 'providers/StateContext';

import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from 'components/complex/error-boundary-fallback/ErrorBoundaryFallback';
import TodoApp from 'components/complex/todo-app/TodoApp';

import 'styles/main.css';

const App: FC = () => (
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    <SnackbarProvider>
      <QueryProvider>
        <StateProvider>
          <TodoApp />
        </StateProvider>
      </QueryProvider>
    </SnackbarProvider>
  </ErrorBoundary>
);

export default App;
