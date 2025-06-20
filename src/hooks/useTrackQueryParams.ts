import { O } from '@mobily/ts-belt';
import {
  useCallback,
  useSearchTextContext,
  useDebounce,
  useValidatedQueryParam,
  useGenreData,
  useQueryParams,
} from '@/hooks/hooks';
import {
  getValidatedOrDefaultQueryParam,
  isTrackListSortableColumn,
  isValidOrder,
  setParamWithResetPage,
} from '@/lib/utils/utils';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

import type { Order, TrackListSort } from '@/lib/types/types';

type TTrackQueryParams = {
  search: string;
  debouncedSearchArtist: string;
  searchArtist: string;
  selectedGenre: string;
  page: number;
  orderBy: Order;
  sortBy: TrackListSort;
  handleChangeOrder: (value: Order) => void;
  handleChangeSort: (value: TrackListSort) => void;
  handleChangePage: (value: number) => void;
  handleChangeSearchArtist: (value: string) => void;
};

const useTrackQueryParams = (): TTrackQueryParams => {
  const { get, getIntParam, set, setMany } = useQueryParams();
  const { debouncedSearchText } = useSearchTextContext();
  const { selectedGenre } = useGenreData();

  const rawPage = useValidatedQueryParam({
    option: getIntParam(QUERY_PARAM_KEYS.page),
    validator: (page) => page >= INITIAL_QUERY_PARAMS_VALUE.page,
    key: QUERY_PARAM_KEYS.page,
    defaultValue: INITIAL_QUERY_PARAMS_VALUE.page,
  });

  const rawOrderBy = useValidatedQueryParam({
    option: get(QUERY_PARAM_KEYS.orderBy),
    validator: isValidOrder,
    key: QUERY_PARAM_KEYS.orderBy,
    defaultValue: INITIAL_QUERY_PARAMS_VALUE.orderBy,
  });

  const rawSortBy = useValidatedQueryParam({
    option: get(QUERY_PARAM_KEYS.sortBy),
    validator: isTrackListSortableColumn,
    key: QUERY_PARAM_KEYS.sortBy,
    defaultValue: INITIAL_QUERY_PARAMS_VALUE.sortBy,
  });

  const rawSearchArtist = get(QUERY_PARAM_KEYS.searchArtist);

  const page = O.getWithDefault(rawPage, INITIAL_QUERY_PARAMS_VALUE.page);
  const orderBy = getValidatedOrDefaultQueryParam(rawOrderBy, isValidOrder, INITIAL_QUERY_PARAMS_VALUE.orderBy);
  const sortBy = getValidatedOrDefaultQueryParam(
    rawSortBy,
    isTrackListSortableColumn,
    INITIAL_QUERY_PARAMS_VALUE.sortBy,
  );
  const searchArtist = O.getWithDefault(rawSearchArtist, INITIAL_QUERY_PARAMS_VALUE.search);
  const debouncedSearchArtist = useDebounce(searchArtist, 250);

  const handleChangeOrder = useCallback(
    (newOrder: Order) => {
      setParamWithResetPage(QUERY_PARAM_KEYS.orderBy, newOrder, setMany);
    },
    [setMany],
  );

  const handleChangeSort = useCallback(
    (newSort: TrackListSort) => {
      setParamWithResetPage(QUERY_PARAM_KEYS.sortBy, newSort, setMany);
    },
    [setMany],
  );

  const handleChangeSearchArtist = useCallback(
    (value: string) => {
      setParamWithResetPage(QUERY_PARAM_KEYS.searchArtist, value, setMany);
    },
    [setMany],
  );

  const handleChangePage = useCallback(
    (newPage: number) => {
      set(QUERY_PARAM_KEYS.page, newPage);
    },
    [set],
  );

  return {
    search: debouncedSearchText,
    debouncedSearchArtist: debouncedSearchArtist,
    searchArtist,
    selectedGenre,
    page,
    orderBy,
    sortBy,
    handleChangeOrder,
    handleChangeSort,
    handleChangeSearchArtist,
    handleChangePage,
  };
};

export { useTrackQueryParams };
