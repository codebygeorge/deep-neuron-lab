import {
  addTodoItemApi,
  deleteTodoItemApi,
  getTodoItemsApi,
  updateTodoItemApi,
} from 'api/itemsApi';

import { useMutation, useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/enums/QueryKeys';

const useGetTodoItemsQuery = () =>
  useQuery({
    queryKey: [QueryKeys.TODO_ITEMS],
    queryFn: getTodoItemsApi,
    // Note: These are added because we use dummy API
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

const useAddTodoItemQuery = () =>
  useMutation({
    mutationFn: addTodoItemApi,
  });

const useUpdateTodoItemQuery = () =>
  useMutation({
    mutationFn: updateTodoItemApi,
  });

const useDeleteTodoItemQuery = () =>
  useMutation({
    mutationFn: deleteTodoItemApi,
  });

export {
  useGetTodoItemsQuery,
  useAddTodoItemQuery,
  useUpdateTodoItemQuery,
  useDeleteTodoItemQuery,
};
