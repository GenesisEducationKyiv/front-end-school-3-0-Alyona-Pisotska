import { createContext } from 'react';
import { useDebounce, useQueryParamsContext } from '@/hooks/hooks';
import { O } from '@mobily/ts-belt';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

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
  const { get, setMany } = useQueryParamsContext();

  const rawSearchText = get(QUERY_PARAM_KEYS.search);
  const searchText = O.getWithDefault(rawSearchText, INITIAL_QUERY_PARAMS_VALUE.search);

  const debouncedSearchText = useDebounce(searchText, 250);

  const handleChangeSearchText = (newSearchText: string) => {
    setMany({
      [QUERY_PARAM_KEYS.page]: INITIAL_QUERY_PARAMS_VALUE.page,
      [QUERY_PARAM_KEYS.search]: newSearchText,
    });
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
