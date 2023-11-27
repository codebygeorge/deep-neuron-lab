import { useStateProvider } from 'providers/StateContext';

import { useMemo } from 'react';

import { Todo } from 'shared/types/models/Todo';

import { useGetTodoItemsQuery } from 'queries/useQueries';

type GroupedTodos = {
  hasTodos: boolean;
  noSearchResults: boolean;
  notCompletedFilteredTodos: Todo[];
  completedFilteredTodos: Todo[];
};

/**
 * @typedef {Object} GroupedTodos
 * @property {boolean} hasTodos - Indicates whether there are any Todos.
 * @property {boolean} noSearchResults - Indicates whether no search results found.
 * @property {Todo[]} notCompletedFilteredTodos - Not completed & filtered todos.
 * @property {Todo[]} completedFilteredTodos - Completed & filtered todos.
 */

/**
 * useGroupedTodos Hook
 *
 * A custom hook that filters and groups them into completed and not completed categories.
 *
 * @returns {GroupedTodos}
 */

export const useGroupedTodos = (): GroupedTodos => {
  const { data } = useGetTodoItemsQuery();
  const { searchValue } = useStateProvider();
  const { todos } = data || {};

  return useMemo(() => {
    const initialState = {
      hasTodos: false,
      noSearchResults: false,
      notCompletedFilteredTodos: [],
      completedFilteredTodos: [],
    };
    if (!todos) return initialState;

    // Filter first with searchValue if persists
    let filteredTodos = [...todos];
    if (searchValue) {
      filteredTodos = todos.filter((todo) =>
        todo.todo.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    // Group todos by 'completed' status
    const { completedFilteredTodos, notCompletedFilteredTodos } = filteredTodos.reduce<
      Pick<GroupedTodos, 'notCompletedFilteredTodos' | 'completedFilteredTodos'>
    >((acc, todo) => {
      if (todo.completed) {
        acc.completedFilteredTodos.push(todo);
      } else {
        acc.notCompletedFilteredTodos.push(todo);
      }
      return acc;
    }, initialState);

    return {
      hasTodos: todos.length > 0,
      noSearchResults: filteredTodos.length === 0,
      completedFilteredTodos,
      notCompletedFilteredTodos,
    };
  }, [todos, searchValue]);
};

export default useGroupedTodos;
