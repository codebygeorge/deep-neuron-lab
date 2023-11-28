import { useStateProvider } from 'providers/StateContext';
import { contextMock, todoQueryDataMock } from 'tests/mockData';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderHookResult, renderHook, waitFor } from '@testing-library/react';

import { QueryKeys } from 'shared/enums/QueryKeys';

import { useFilterGroupedTodos } from './useFilterGroupedTodos';

jest.mock('providers/StateContext');

const useStateProviderMock = useStateProvider as jest.MockedFunction<typeof useStateProvider>;

describe('useFilterGroupedTodos', () => {
  let queryClient: QueryClient;
  let renderedHook: RenderHookResult<ReturnType<typeof useFilterGroupedTodos>, unknown>;

  beforeEach(() => {
    useStateProviderMock.mockReturnValue(contextMock);
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          retry: false,
        },
      },
    });
    renderedHook = renderHook(() => useFilterGroupedTodos(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should return initial state when there are no todos.', () => {
    const { result } = renderedHook;

    expect(result.current).toEqual({
      hasTodos: false,
      noSearchResults: false,
      notCompletedFilteredTodos: [],
      completedFilteredTodos: [],
    });
  });

  test('Should correctly group todos.', () => {
    queryClient.setQueryData([QueryKeys.TODO_ITEMS], todoQueryDataMock);
    const { todos } = todoQueryDataMock;
    const { result } = renderedHook;

    waitFor(() => {
      expect(result.current).toEqual({
        hasTodos: true,
        noSearchResults: false,
        notCompletedFilteredTodos: [todos[0], todos[3]],
        completedFilteredTodos: [todos[1], todos[2]],
      });
    });
  });

  test('Should correctly filter and group todos based on searchValue.', () => {
    queryClient.setQueryData([QueryKeys.TODO_ITEMS], todoQueryDataMock);
    const { todos } = todoQueryDataMock;
    const { result } = renderedHook;

    // Case: search not completed & group
    useStateProviderMock.mockReturnValue({
      ...contextMock,
      searchValue: '1',
    });
    waitFor(() => {
      expect(result.current).toEqual({
        hasTodos: true,
        noSearchResults: false,
        notCompletedFilteredTodos: [todos[0]],
        completedFilteredTodos: [],
      });
    });

    // Case: search completed & group
    useStateProviderMock.mockReturnValue({
      ...contextMock,
      searchValue: '3',
    });
    waitFor(() => {
      expect(result.current).toEqual({
        hasTodos: true,
        noSearchResults: false,
        notCompletedFilteredTodos: [],
        completedFilteredTodos: [todos[2]],
      });
    });
  });

  test('Should return empty arrays when no search results found.', () => {
    queryClient.setQueryData([QueryKeys.TODO_ITEMS], todoQueryDataMock);
    const { result } = renderedHook;

    useStateProviderMock.mockReturnValue({
      ...contextMock,
      searchValue: 'la-la-la',
    });
    waitFor(() => {
      expect(result.current).toEqual({
        hasTodos: true,
        noSearchResults: true,
        notCompletedFilteredTodos: [],
        completedFilteredTodos: [],
      });
    });
  });
});
