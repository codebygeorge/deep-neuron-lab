import { todosMock } from 'tests/mockData';

import { render, screen } from '@testing-library/react';

import TodoList from './TodoList';

jest.mock('providers/StateContext', () => ({
  useStateProvider: () => ({
    toggleTodo: jest.fn(),
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
  }),
}));

describe('TodoList', () => {
  test('TodoList renders todo items.', () => {
    render(<TodoList todos={todosMock} />);
    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems).toHaveLength(todosMock.length);
  });

  test('TodoList should not render with no todos.', () => {
    render(<TodoList todos={[]} />);
    const todoListContainer = screen.queryByTestId('todo-list');
    expect(todoListContainer).toBeFalsy();
  });
});
