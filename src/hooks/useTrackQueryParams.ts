import { O } from '@mobily/ts-belt';
import {
  useCallback,
  useSearchTextContext,
  useGenreContext,
  useQueryParamsContext,
  useDebounce,
  useResetInvalidQueryParam,
} from '@/hooks/hooks';
import {
  getValidatedOrDefaultQueryParam,
  isTrackListSortableColumn,
  isValidOrder,
  isValidQueryParam,
  setParamWithResetPage,
} from '@/lib/utils/utils';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

import type { Order, TrackListSort } from '@/lib/types/types';

type TTrackQueryParams = {
  search: string;
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
  const { get, getIntParam, set, setMany } = useQueryParamsContext();
  const { debouncedSearchText } = useSearchTextContext();
  const { selectedGenre } = useGenreContext();

  const rawPage = getIntParam(QUERY_PARAM_KEYS.page);
  const rawOrderBy = get(QUERY_PARAM_KEYS.orderBy);
  const rawSortBy = get(QUERY_PARAM_KEYS.sortBy);
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

  const isValidPageParamInUrl = isValidQueryParam(rawPage, (page) => page >= INITIAL_QUERY_PARAMS_VALUE.page);
  const isValidOrderParamInUrl = isValidQueryParam(rawOrderBy, isValidOrder);
  const isValidSortParamInUrl = isValidQueryParam(rawSortBy, isTrackListSortableColumn);

  useResetInvalidQueryParam(isValidPageParamInUrl, QUERY_PARAM_KEYS.page, INITIAL_QUERY_PARAMS_VALUE.page);
  useResetInvalidQueryParam(isValidOrderParamInUrl, QUERY_PARAM_KEYS.orderBy, INITIAL_QUERY_PARAMS_VALUE.orderBy);
  useResetInvalidQueryParam(isValidSortParamInUrl, QUERY_PARAM_KEYS.sortBy, INITIAL_QUERY_PARAMS_VALUE.sortBy);

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
    searchArtist: debouncedSearchArtist,
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
