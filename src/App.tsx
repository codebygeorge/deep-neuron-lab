import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from 'components/complex/error-boundary-fallback/ErrorBoundaryFallback';

import 'styles/main.css';

const App: FC = () => (
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    {/*<QueryProvider>*/}
    {/*  <StateContext.Provider*/}
    {/*    value={{*/}
    {/*      selectedCategory,*/}
    {/*      setSelectedCategory,*/}
    {/*      searchValue,*/}
    {/*      setSearchValue,*/}
    {/*    }}*/}
    {/*  >*/}
    {/*    <AppRoutes />*/}
    {/*  </StateContext.Provider>*/}
    {/*</QueryProvider>*/}
  </ErrorBoundary>
);

export default App;
