import React, { createContext } from 'react';
import { useState, useDebounce } from '@/hooks/hooks';

type SearchTextContextProviderProps = {
  children: React.ReactNode;
};

type TSearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

const SearchTextContext = createContext<TSearchTextContext | null>(null);

const SearchTextContextProvider = ({ children }: SearchTextContextProviderProps) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 250);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
};

export { SearchTextContextProvider, SearchTextContext };
