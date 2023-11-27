export const todosMock = [
  { id: 1, todo: 'Todo 1', completed: false, userId: 1 },
  { id: 2, todo: 'Todo 2', completed: true, userId: 1 },
  { id: 3, todo: 'Todo 3', completed: true, userId: 1 },
  { id: 4, todo: 'Todo 4', completed: false, userId: 1 },
];

export const todoQueryDataMock = {
  todos: todosMock,
  total: 4,
  skip: 0,
  limit: 0,
};

export const contextMock = {
  addTodo: jest.fn(),
  toggleTodo: jest.fn(),
  editTodo: jest.fn(),
  deleteTodo: jest.fn(),
  searchValue: '',
  setSearchValue: jest.fn(),
};
