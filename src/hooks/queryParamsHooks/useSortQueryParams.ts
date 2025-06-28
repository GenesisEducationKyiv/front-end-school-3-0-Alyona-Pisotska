import { useCallback, useValidatedQueryParam, useQueryParams } from '@/hooks/hooks';
import { isTrackListSortableColumn, isValidOrder, setParamWithResetPage } from '@/lib/utils/utils';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

import type { Order, TrackListSort } from '@/lib/types/types';

const useSortQueryParams = () => {
  const { get, setMany } = useQueryParams();

  const orderBy = useValidatedQueryParam({
    option: get(QUERY_PARAM_KEYS.orderBy),
    validator: isValidOrder,
    key: QUERY_PARAM_KEYS.orderBy,
    defaultValue: INITIAL_QUERY_PARAMS_VALUE.orderBy,
  });

  const sortBy = useValidatedQueryParam({
    option: get(QUERY_PARAM_KEYS.sortBy),
    validator: isTrackListSortableColumn,
    key: QUERY_PARAM_KEYS.sortBy,
    defaultValue: INITIAL_QUERY_PARAMS_VALUE.sortBy,
  });

  const handleChangeOrder = useCallback(
    (newOrder: Order) => {
      if (orderBy === newOrder) {
        return;
      }

      setParamWithResetPage(QUERY_PARAM_KEYS.orderBy, newOrder, setMany);
    },
    [orderBy, setMany],
  );

  const handleChangeSort = useCallback(
    (newSort: TrackListSort) => {
      if (sortBy === newSort) {
        return;
      }

      setParamWithResetPage(QUERY_PARAM_KEYS.sortBy, newSort, setMany);
    },
    [sortBy, setMany],
  );

  return {
    orderBy,
    sortBy,
    handleChangeOrder,
    handleChangeSort,
  };
};

export { useSortQueryParams };
