import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import useTodoActions from 'hooks/complex/useTodoActions';

type State = {
  searchValue: string;
};

type Actions = {
  // setSearchValue: Dispatch<SetStateAction<string>>;
  setSearchValue: (newSearch: string) => void;
  // resetSearchValue(): void;
} & ReturnType<typeof useTodoActions>;

type StateProviderProps = {
  children: ReactNode;
  initialState?: State;
};

type StateProviderValue = Actions & State;

const Context = createContext<StateProviderValue | null>(null);

const INITIAL_STATE: State = { searchValue: '' };

const StateProvider = ({ children, initialState = INITIAL_STATE }: StateProviderProps) => {
  const [state, setState] = useState<State>(initialState);
  const todoActions = useTodoActions();

  const value = useMemo<StateProviderValue>(
    () => ({
      ...state,
      setSearchValue: (newSearch) => {
        setState((prevState) => ({ ...prevState, searchValue: newSearch }));
      },
      ...todoActions,
      // resetSearchValue: () => {
      //   setState(INITIAL_STATE);
      // },
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
