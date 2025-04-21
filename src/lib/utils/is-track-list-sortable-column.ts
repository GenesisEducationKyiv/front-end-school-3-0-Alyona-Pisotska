import { TRACK_LIST_SORT_BY } from '@/lib/constants/constants.ts';

import type { TrackListSort } from '@/lib/types/types.ts';

const SORTABLE_COLUMNS = TRACK_LIST_SORT_BY as TrackListSort[];

const isTrackListSortableColumn = (key: string): key is TrackListSort => {
  return SORTABLE_COLUMNS.includes(key as TrackListSort);
};

export { isTrackListSortableColumn };
