import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('Should render todo app.', () => {
  render(<App />);
  const todoApp = screen.queryByTestId('todo-app-container');
  expect(todoApp).toBeInTheDocument();
});
