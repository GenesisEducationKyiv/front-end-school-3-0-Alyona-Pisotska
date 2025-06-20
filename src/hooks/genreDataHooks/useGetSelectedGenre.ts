import { useQueryParams } from '@/hooks/hooks';
import { O } from '@mobily/ts-belt';
import { INITIAL_QUERY_PARAMS_VALUE, QUERY_PARAM_KEYS } from '@/lib/constants/constants';

const useGetSelectedGenre = () => {
  const { get } = useQueryParams();
  const genreFromURL = get(QUERY_PARAM_KEYS.genre);

  const selectedGenre = O.getWithDefault(genreFromURL, INITIAL_QUERY_PARAMS_VALUE.search);

  return { selectedGenre };
};

export { useGetSelectedGenre };
