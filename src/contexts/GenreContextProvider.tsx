import React, { createContext } from 'react';
import { useGetGenreList } from '@/hooks/hooks.ts';

import type { Track } from '@/lib/types/types.ts';

type GenreContextProviderProps = {
  children: React.ReactNode;
};

type TGenreContext = {
  genreList: Track['genre'];
  isLoading: boolean;
};

const GenreContext = createContext<TGenreContext | null>(null);

const GenreContextProvider = ({ children }: GenreContextProviderProps) => {
  const { genreList, isLoading } = useGetGenreList();

  return (
    <GenreContext.Provider
      value={{
        genreList,
        isLoading,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};

export { GenreContextProvider, GenreContext };
