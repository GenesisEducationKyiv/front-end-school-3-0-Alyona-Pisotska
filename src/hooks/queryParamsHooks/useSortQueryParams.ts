import { useCallback, useValidatedQueryParam, useQueryParams } from '@/hooks/hooks';
import {
  getValidatedOrDefaultQueryParam,
  isTrackListSortableColumn,
  isValidOrder,
  setParamWithResetPage,
} from '@/lib/utils/utils';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

import type { Order, TrackListSort } from '@/lib/types/types';

const useSortQueryParams = () => {
  const { get, setMany } = useQueryParams();

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

  const orderBy = getValidatedOrDefaultQueryParam(rawOrderBy, isValidOrder, INITIAL_QUERY_PARAMS_VALUE.orderBy);
  const sortBy = getValidatedOrDefaultQueryParam(
    rawSortBy,
    isTrackListSortableColumn,
    INITIAL_QUERY_PARAMS_VALUE.sortBy,
  );

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

  return {
    orderBy,
    sortBy,
    handleChangeOrder,
    handleChangeSort,
  };
};

export { useSortQueryParams };
