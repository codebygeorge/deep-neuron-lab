import { GetTodoItemsResponse } from 'api/itemsApi';
import { useSnackbar } from 'notistack';
import { arrayMove } from 'utils/helpers';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { QueryKeys } from 'shared/enums/QueryKeys';
import { Todo } from 'shared/types/models/Todo';

import {
  useAddTodoItemQuery,
  useDeleteTodoItemQuery,
  useUpdateTodoItemQuery,
} from 'queries/useQueries';

export const useTodoActions = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: mutateAdd } = useAddTodoItemQuery();
  const { mutateAsync: mutateUpdate } = useUpdateTodoItemQuery();
  const { mutateAsync: mutateDelete } = useDeleteTodoItemQuery();
  const { enqueueSnackbar } = useSnackbar();

  const addTodoToCache = useCallback((data: Todo) => {
    queryClient.setQueryData([QueryKeys.TODO_ITEMS], (oldData: GetTodoItemsResponse) => ({
      ...oldData,
      todos: [
        ...oldData.todos,
        {
          ...data,
          id: `${Math.random()}`, // Any random id as fake API always returns 151.
          isLocal: true, // Indicate local use only
        },
      ],
    }));
  }, []);

  const replaceTodoInCache = useCallback((data: Todo, position?: 'start' | 'end') => {
    queryClient.setQueryData([QueryKeys.TODO_ITEMS], (oldData: GetTodoItemsResponse) => {
      const newTodos = [...oldData.todos];
      const findIndex = newTodos.findIndex((todo) => todo.id === data.id);
      newTodos[findIndex] = data;
      if (position) {
        arrayMove(newTodos, findIndex, position === 'start' ? 0 : newTodos.length - 1);
      }
      return {
        ...oldData,
        todos: newTodos,
      };
    });
  }, []);

  const removeTodoFromCache = useCallback((id: number) => {
    queryClient.setQueryData([QueryKeys.TODO_ITEMS], (oldData: GetTodoItemsResponse) => ({
      ...oldData,
      todos: oldData.todos.filter((todo) => todo.id !== id),
    }));
  }, []);

  const addTodo = useCallback(async () => {
    try {
      const res = await mutateAdd({
        todo: 'New',
        completed: false,
        userId: 5, // Random id as it is not used
      });
      addTodoToCache(res);
    } catch (err) {
      enqueueSnackbar('Failed to create todo', {
        variant: 'error',
      });
      throw err;
    }
  }, [addTodoToCache]);

  const toggleTodo = useCallback(
    async (data: Todo) => {
      const newTodoState = { ...data, completed: !data.completed };
      const position = newTodoState.completed ? 'start' : 'end';

      if (data?.isLocal) {
        replaceTodoInCache(newTodoState, position);
      } else {
        try {
          const res = await mutateUpdate(newTodoState);
          replaceTodoInCache(res, position);
        } catch (err) {
          enqueueSnackbar('Failed to toggle todo', {
            variant: 'error',
          });
          throw err;
        }
      }
    },
    [replaceTodoInCache],
  );

  const editTodo = useCallback(
    async (todoNewData: Todo) => {
      if (todoNewData?.isLocal) {
        replaceTodoInCache(todoNewData);
      } else {
        try {
          const res = await mutateUpdate(todoNewData);
          replaceTodoInCache(res);
        } catch (err) {
          enqueueSnackbar('Failed to save todo', {
            variant: 'error',
          });
          throw err;
        }
      }
    },
    [replaceTodoInCache],
  );

  const deleteTodo = useCallback(
    async (todoData: Todo) => {
      if (todoData?.isLocal) {
        removeTodoFromCache(todoData.id);
      } else {
        try {
          await mutateDelete(todoData);
          removeTodoFromCache(todoData.id);
        } catch (err) {
          enqueueSnackbar('Failed to delete todo', {
            variant: 'error',
          });
          throw err;
        }
      }
    },
    [removeTodoFromCache],
  );

  return { addTodo, toggleTodo, editTodo, deleteTodo };
};

export default useTodoActions;
