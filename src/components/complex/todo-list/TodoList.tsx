import { FC } from 'react';

import { Todo } from 'shared/types/models/Todo';

import TodoItem from 'components/complex/todo-item/TodoItem';

import './todo-list.css';

type TodoListProps = {
  todos: Todo[] | undefined;
};

const TodoList: FC<TodoListProps> = ({ todos }) => {
  if (!todos || todos?.length === 0) {
    return null;
  }

  return (
    <div className="todo-list-container">
      <ul className="todo-list">{todos?.map((todo) => <TodoItem key={todo.id} data={todo} />)}</ul>
    </div>
  );
};

export default TodoList;
