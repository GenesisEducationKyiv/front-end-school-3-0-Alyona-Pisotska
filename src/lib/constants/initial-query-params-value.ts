import { ORDER_BY, TRACK_TABLE_CELL_IDS } from '@/lib/constants/constants';

import type { Order, TrackListSort } from '@/lib/types/types';

const INITIAL_PAGINATION_PAGE = 1;
const INITIAL_SEARCH = '';
const INITIAL_ORDER_BY = ORDER_BY.asc as Order;
const INITIAL_SORT_BY = TRACK_TABLE_CELL_IDS.artist as TrackListSort;

const INITIAL_QUERY_PARAMS_VALUE = {
  page: INITIAL_PAGINATION_PAGE,
  search: INITIAL_SEARCH,
  orderBy: INITIAL_ORDER_BY,
  sortBy: INITIAL_SORT_BY,
};

export { INITIAL_QUERY_PARAMS_VALUE };
