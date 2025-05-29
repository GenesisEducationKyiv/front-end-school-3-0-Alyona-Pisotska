import React, { createContext, useCallback } from 'react';
import { useGetGenreList, useMemo, useState } from '@/hooks/hooks.ts';

import type { SelectOption, Track } from '@/lib/types/types.ts';

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
  const [selectedGenre, setSelectedGenre] = useState('');

  const { genreList, isLoading } = useGetGenreList();

  const genreOptions = useMemo(() => {
    return genreList.map((item) => ({ value: item, label: item }));
  }, [genreList]);

  const handleChangeSelectedGenre = useCallback((genre: string) => {
    setSelectedGenre(genre);
  }, []);

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
