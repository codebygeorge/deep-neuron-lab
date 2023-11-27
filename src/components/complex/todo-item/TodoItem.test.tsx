import { useStateProvider } from 'providers/StateContext';
import { contextMock, todosMock } from 'tests/mockData';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import TodoItem from './TodoItem';

jest.mock('providers/StateContext');

const useStateProviderMock = useStateProvider as jest.MockedFunction<typeof useStateProvider>;

describe('TodoItem', () => {
  const todoData = todosMock[1];

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should call toggle action after 2300ms.', async () => {
    const toggleTodoMock = jest.fn();
    useStateProviderMock.mockReturnValue({
      ...contextMock,
      toggleTodo: toggleTodoMock,
    });

    render(<TodoItem data={todoData} />);

    const checkboxElement = screen.getByTestId('toggle-checkbox');
    fireEvent.click(checkboxElement);

    expect(toggleTodoMock).not.toHaveBeenCalled();
    await waitFor(
      () => {
        expect(toggleTodoMock).toBeCalledTimes(1);
        expect(toggleTodoMock).toHaveBeenCalledWith(todoData);
      },
      { timeout: 2500 },
    );
  });

  test('Should Not call toggle action if its unchecked before timeout.', async () => {
    const toggleTodoMock = jest.fn();
    useStateProviderMock.mockReturnValue({
      ...contextMock,
      toggleTodo: toggleTodoMock,
    });

    render(<TodoItem data={todoData} />);

    const checkboxElement = screen.getByTestId('toggle-checkbox');
    fireEvent.click(checkboxElement);

    await waitFor(
      () => {
        fireEvent.click(checkboxElement);
      },
      { timeout: 1500 },
    );

    expect(toggleTodoMock).not.toHaveBeenCalled();
  });

  test('Should call save action after edit.', async () => {
    const editTodoMock = jest.fn();
    useStateProviderMock.mockReturnValue({
      ...contextMock,
      editTodo: editTodoMock,
    });

    render(<TodoItem data={todoData} />);

    const textarea = screen.getByTestId('todo-item-textarea');
    fireEvent.click(textarea);
    const newValue = 'lalalaa';
    fireEvent.change(textarea, { target: { value: newValue } });

    expect(editTodoMock).not.toHaveBeenCalled();
    await waitFor(
      () => {
        expect(editTodoMock).toBeCalledTimes(1);
        expect(editTodoMock).toHaveBeenCalledWith({
          ...todoData,
          todo: newValue,
        });
      },
      { timeout: 550 },
    );
  });

  test('Should not be able to toggle or remove todo while loading.', async () => {
    const editTodoMock = jest.fn();
    useStateProviderMock.mockReturnValue({
      ...contextMock,
      editTodo: editTodoMock,
    });

    render(<TodoItem data={todoData} />);

    const textarea = screen.getByTestId('todo-item-textarea');
    const checkboxElement = screen.getByTestId('toggle-checkbox');
    const deleteButton = screen.getByTestId('delete-button');

    fireEvent.click(textarea);
    fireEvent.change(textarea, { target: { value: 'newValue' } });

    await waitFor(
      () => {
        expect(checkboxElement).toBeDisabled();
        expect(deleteButton).toBeDisabled();
      },
      { timeout: 550 },
    );
  });
});
