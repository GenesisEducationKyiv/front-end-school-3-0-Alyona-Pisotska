import { useMemo, useGetGenreList, useSelectGenreQueryParam } from '@/hooks/hooks';

import type { SelectOption } from '@/lib/types/types';

const useGenreData = () => {
  const { genreList, isLoading } = useGetGenreList();
  const { selectedGenre } = useSelectGenreQueryParam();

  const genreOptions: SelectOption[] = useMemo(() => {
    return genreList.map((item) => ({ value: item, label: item }));
  }, [genreList]);

  return {
    genreList,
    isLoading,
    genreOptions,
    selectedGenre,
  };
};

export { useGenreData };
