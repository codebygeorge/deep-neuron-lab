import userEvent from '@testing-library/user-event';
import { useStateProvider } from 'providers/StateContext';
import { contextMock } from 'tests/mockData';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SearchBar from './SearchBar';

jest.mock('providers/StateContext');

const useStateProviderMock = useStateProvider as jest.MockedFunction<typeof useStateProvider>;

describe('SearchBar', () => {
  let setSearchValueMock: jest.Mock;

  beforeEach(() => {
    setSearchValueMock = jest.fn();
    useStateProviderMock.mockImplementation(() => ({
      ...contextMock,
      setSearchValue: setSearchValueMock,
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should updates value on user input.', () => {
    render(<SearchBar />);
    const inputElement = screen.getByTestId('search-input');

    const input = 'test';
    fireEvent.change(inputElement, { target: { value: input } });
    expect(inputElement).toHaveValue(input);
  });

  test('Should submit search with delay.', async () => {
    render(<SearchBar />);

    const inputElement = screen.getByTestId('search-input');
    const input = 'test';
    userEvent.type(inputElement, input);

    expect(setSearchValueMock).not.toBeCalled();
    await waitFor(
      () => {
        expect(setSearchValueMock).toBeCalledWith(input);
      },
      { timeout: 350 },
    );
  });

  test('Should submit last search value only.', async () => {
    render(<SearchBar />);

    const inputElement = screen.getByTestId('search-input');
    const input1 = 'test 1';
    const input2 = '2';
    const input3 = '3';
    userEvent.type(inputElement, input1);
    userEvent.type(inputElement, input2);
    userEvent.type(inputElement, input3);

    expect(setSearchValueMock).not.toBeCalled();
    await waitFor(
      () => {
        expect(setSearchValueMock).toBeCalledWith(`${input1}${input2}${input3}`);
      },
      { timeout: 350 },
    );
  });
});
