import { request } from 'api/request';

import { ApiUrls } from 'shared/enums/ApiUrls';
import { Todo } from 'shared/types/models/Todo';

export type GetTodoItemsResponse = {
  total: number;
  limit: number;
  skip: number;
  todos: Todo[];
};

export const getTodoItemsApi = () => request<GetTodoItemsResponse>({ url: ApiUrls.GET_TODO_ITEMS });

export const addTodoItemApi = (data: Omit<Todo, 'id'>) =>
  request<Todo>({ url: ApiUrls.ADD_TODO, body: data });

export const updateTodoItemApi = ({ id, ...data }: Todo) =>
  request<Todo>({ url: ApiUrls.UPDATE_TODO, pathParams: { id }, body: data });

export const deleteTodoItemApi = ({ id }: Todo) =>
  request<Todo>({ url: ApiUrls.DELETE_TODO, pathParams: { id } });
