import React, { createContext, useCallback } from 'react';
import { useGetGenreList, useMemo, useQueryParamsContext } from '@/hooks/hooks';
import { O } from '@mobily/ts-belt';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

import type { SelectOption, Track } from '@/lib/types/types';

type GenreContextProviderProps = {
  children: React.ReactNode;
};

type TGenreContext = {
  genreList: Track['genres'];
  isLoading: boolean;
  genreOptions: SelectOption[];
  selectedGenre: string;
  handleChangeSelectedGenre: (genre: string) => void;
};

const GenreContext = createContext<TGenreContext | null>(null);

const GenreContextProvider = ({ children }: GenreContextProviderProps) => {
  const { get, setMany } = useQueryParamsContext();
  const { genreList, isLoading } = useGetGenreList();

  const rawSelectedGenre = get(QUERY_PARAM_KEYS.genre);
  const selectedGenre = O.getWithDefault(rawSelectedGenre, INITIAL_QUERY_PARAMS_VALUE.search);

  const genreOptions = useMemo(() => {
    return genreList.map((item) => ({ value: item, label: item }));
  }, [genreList]);

  const handleChangeSelectedGenre = useCallback(
    (genre: string) => {
      setMany({
        [QUERY_PARAM_KEYS.page]: INITIAL_QUERY_PARAMS_VALUE.page,
        [QUERY_PARAM_KEYS.genre]: genre,
      });
    },
    [setMany],
  );

  return (
    <GenreContext.Provider
      value={{
        genreList,
        isLoading,
        genreOptions,
        selectedGenre,
        handleChangeSelectedGenre,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};

export { GenreContextProvider, GenreContext };
