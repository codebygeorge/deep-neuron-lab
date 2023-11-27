import { useStateProvider } from 'providers/StateContext';

import { ChangeEvent, FC, useState } from 'react';

import { useDebounce, useDidUpdate } from 'hooks/common';

import './search-bar.css';

const SearchBar: FC = () => {
  const { searchValue, setSearchValue } = useStateProvider();
  const [inputValue, setInputValue] = useState(searchValue || '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const debouncedSearch = useDebounce(inputValue);

  // Apply debounced search
  useDidUpdate(() => {
    setSearchValue(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" value={inputValue} onChange={handleInputChange} />
    </div>
  );
};

export default SearchBar;
