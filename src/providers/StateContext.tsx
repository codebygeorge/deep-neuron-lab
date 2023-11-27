import { FC, ReactNode, createContext, useContext, useMemo, useState } from 'react';

import useTodoActions from 'hooks/complex/useTodoActions';

type State = {
  searchValue: string;
};

type Actions = {
  setSearchValue: (newSearch: string) => void;
} & ReturnType<typeof useTodoActions>;

type StateProviderProps = {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  initialState?: State;
};

type StateProviderValue = Actions & State;

const Context = createContext<StateProviderValue | null>(null);

const INITIAL_STATE: State = { searchValue: '' };

const StateProvider: FC<StateProviderProps> = ({ children, initialState = INITIAL_STATE }) => {
  const [state, setState] = useState<State>(initialState);
  const todoActions = useTodoActions();

  const value = useMemo<StateProviderValue>(
    () => ({
      ...state,
      setSearchValue: (newSearch) => {
        setState((prevState) => ({ ...prevState, searchValue: newSearch }));
      },
      ...todoActions,
    }),
    [state, todoActions],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useStateProvider = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw Error('State provider is missing');
  }

  return ctx;
};

export { StateProvider, useStateProvider };
