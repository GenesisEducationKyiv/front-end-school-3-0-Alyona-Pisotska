import { useCallback, useDebounce, useQueryParams } from '@/hooks/hooks';
import { O } from '@mobily/ts-belt';
import { setParamWithResetPage } from '@/lib/utils/utils';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

const DELAY = 250;

const useSearchQueryParam = (delay = DELAY) => {
  const { get, setMany } = useQueryParams();

  const rawSearchText = get(QUERY_PARAM_KEYS.search);
  const searchText = O.getWithDefault(rawSearchText, INITIAL_QUERY_PARAMS_VALUE.search);

  const debouncedSearchText = useDebounce(searchText, delay);

  const handleChangeSearchText = useCallback(
    (newSearchText: string) => {
      setParamWithResetPage(QUERY_PARAM_KEYS.search, newSearchText, setMany);
    },
    [setMany],
  );

  return {
    searchText,
    debouncedSearchText,
    handleChangeSearchText,
  };
};

export { useSearchQueryParam };
