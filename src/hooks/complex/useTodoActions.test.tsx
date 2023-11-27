import { GetTodoItemsResponse } from 'api/itemsApi';
import { todoQueryDataMock, todosMock } from 'tests/mockData';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderHookResult, act, renderHook, waitFor } from '@testing-library/react';

import { QueryKeys } from 'shared/enums/QueryKeys';

import useTodoActions from './useTodoActions';

describe('useTodoActions', () => {
  let queryClient: QueryClient;
  let renderedHook: RenderHookResult<ReturnType<typeof useTodoActions>, unknown>;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          retry: false,
        },
      },
    });
    queryClient.setQueryData([QueryKeys.TODO_ITEMS], todoQueryDataMock);
    renderedHook = renderHook(() => useTodoActions(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should add local todo to query cache.', async () => {
    const { result } = renderedHook;

    await act(async () => {
      await result.current.addTodo();

      await waitFor(() => {
        const { todos } = queryClient.getQueryData([QueryKeys.TODO_ITEMS]) as GetTodoItemsResponse;
        expect(todos.length).toBe(todoQueryDataMock.todos.length + 1);
        expect(todos[todos.length - 1].isLocal).toBe(true);
      });
    });
  });

  test('Should update todo in query cache.', async () => {
    const { result } = renderedHook;
    const newEditData = { id: 1, todo: 'Testing', completed: false, userId: 1 };

    await act(async () => {
      await result.current.editTodo(newEditData);

      await waitFor(() => {
        const { todos } = queryClient.getQueryData([QueryKeys.TODO_ITEMS]) as GetTodoItemsResponse;
        expect(todos.length).toBe(todoQueryDataMock.todos.length);
        expect(todos.find((todo) => todo.id === newEditData.id)?.todo).toBe('Testing');
      });
    });

    await act(async () => {
      await result.current.toggleTodo(newEditData);

      await waitFor(() => {
        const { todos } = queryClient.getQueryData([QueryKeys.TODO_ITEMS]) as GetTodoItemsResponse;
        expect(todos.length).toBe(todoQueryDataMock.todos.length);
        expect(todos.find((todo) => todo.id === newEditData.id)?.completed).toBe(
          !newEditData.completed,
        );
      });
    });
  });

  test('Should delete todo from query cache.', async () => {
    const { result } = renderedHook;
    const newEditData = todosMock[2];

    await act(async () => {
      await result.current.deleteTodo(newEditData);

      await waitFor(() => {
        const { todos } = queryClient.getQueryData([QueryKeys.TODO_ITEMS]) as GetTodoItemsResponse;
        expect(todos.length).toBe(todoQueryDataMock.todos.length - 1);
        expect(todos.find((todo) => todo.id === newEditData.id)).toBeFalsy();
      });
    });
  });
});
