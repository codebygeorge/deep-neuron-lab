import { useStateProvider } from 'providers/StateContext';

import { render, screen } from '@testing-library/react';
import React from 'react';

import useFilterGroupedTodos from 'hooks/complex/useFilterGroupedTodos';

import { useGetTodoItemsQuery } from 'queries/useQueries';

import TodoApp from './TodoApp';

jest.mock('queries/useQueries');
jest.mock('hooks/complex/useFilterGroupedTodos');
jest.mock('providers/StateContext');

const useGetTodoItemsQueryMock = useGetTodoItemsQuery as jest.MockedFunction<
  typeof useGetTodoItemsQuery
>;
const useFilterGroupedTodosMock = useFilterGroupedTodos as jest.MockedFunction<
  typeof useFilterGroupedTodos
>;
const useStateProviderMock = useStateProvider as jest.MockedFunction<typeof useStateProvider>;

describe('TodoApp', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useStateProviderMock.mockReturnValue({});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useGetTodoItemsQueryMock.mockReturnValue({});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useFilterGroupedTodosMock.mockReturnValue({});
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should render Loader while loading.', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useGetTodoItemsQueryMock.mockReturnValue({ isLoading: true });
    render(<TodoApp />);
    const loadingElement = screen.queryByTestId('loader');
    expect(loadingElement).toBeInTheDocument();
  });

  test('Should render ErrorBlock on error.', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useGetTodoItemsQueryMock.mockReturnValue({ isFetched: true, isError: true });
    render(<TodoApp />);
    const errorBlock = screen.queryByTestId('error-block');
    expect(errorBlock).toBeInTheDocument();
  });

  test('Should render Search and Add button only if query is successful.', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useGetTodoItemsQueryMock.mockReturnValue({ isFetched: true, isError: false });
    render(<TodoApp />);
    const searchInput = screen.queryByTestId('search-input');
    const addButton = screen.queryByTestId('add-button');
    expect(searchInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('Should render Empty block with /No todos found/ if no search result found.', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useGetTodoItemsQueryMock.mockReturnValue({
      isFetched: true,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useFilterGroupedTodosMock.mockReturnValue({
      hasTodos: true,
      noSearchResults: true,
    });

    render(<TodoApp />);
    const emptyBlock = screen.queryByTestId('empty-block');
    expect(emptyBlock).toBeInTheDocument();
    expect(emptyBlock).toHaveTextContent('No todos found');
  });

  test('Should render Empty block with /You have no todos!/ if there is no todos.', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useGetTodoItemsQueryMock.mockReturnValue({
      isFetched: true,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useFilterGroupedTodosMock.mockReturnValue({
      hasTodos: false,
      noSearchResults: true,
    });

    render(<TodoApp />);
    const emptyBlock = screen.queryByTestId('empty-block');
    expect(emptyBlock).toBeInTheDocument();
    expect(emptyBlock).toHaveTextContent('You have no todos!');
  });
});
