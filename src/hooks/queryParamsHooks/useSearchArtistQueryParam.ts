import { O } from '@mobily/ts-belt';
import { useCallback, useDebounce, useQueryParams } from '@/hooks/hooks';
import { setParamWithResetPage } from '@/lib/utils/utils';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

const DELAY = 250;

const useSearchArtistQueryParam = () => {
  const { get, setMany } = useQueryParams();

  const rawSearchArtist = get(QUERY_PARAM_KEYS.searchArtist);

  const searchArtist = O.getWithDefault(rawSearchArtist, INITIAL_QUERY_PARAMS_VALUE.search);
  const debouncedSearchArtist = useDebounce(searchArtist, DELAY);

  const handleChangeSearchArtist = useCallback(
    (value: string) => {
      setParamWithResetPage(QUERY_PARAM_KEYS.searchArtist, value, setMany);
    },
    [setMany],
  );

  return {
    searchArtist,
    debouncedSearchArtist,
    handleChangeSearchArtist,
  };
};

export { useSearchArtistQueryParam };
