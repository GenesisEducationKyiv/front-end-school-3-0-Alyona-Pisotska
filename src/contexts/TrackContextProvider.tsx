import { createContext } from 'react';
import { useGetTrackList, useState } from '@/hooks/hooks.ts';
import { ORDER_BY, TRACK_TABLE_CELL_IDS } from '@/lib/constants/constants.ts';

import type { Track, PaginationMeta, Order, TrackListSort } from '@/lib/types/types.ts';

type TrackContextProvider = {
  children: React.ReactNode;
};

type TTrackContext = {
  tracks: Track[];
  paginationData: PaginationMeta | null;
  isLoadingTrackList: boolean;
  handleChangeOrder: (value: Order) => void;
  handleChangeSort: (value: TrackListSort) => void;
};

const TrackContext = createContext<TTrackContext | null>(null);

function TrackContextProvider({ children }: TrackContextProvider) {
  const [orderBy, setOrderBy] = useState<Order>(ORDER_BY.asc);
  const [sortBy, setSortBy] = useState<TrackListSort>(TRACK_TABLE_CELL_IDS.artist);

  const { trackList, paginationData, isLoadingTrackList } = useGetTrackList({
    page: 1,
    limit: 10,
    sort: sortBy,
    order: orderBy,
  });

  const handleChangeOrder = (newOrder: Order) => {
    setOrderBy(newOrder);
  };

  const handleChangeSort = (newSort: TrackListSort) => {
    setSortBy(newSort);
  };

  return (
    <TrackContext.Provider
      value={{
        tracks: trackList,
        paginationData,
        isLoadingTrackList,
        handleChangeOrder,
        handleChangeSort,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
}

export { TrackContextProvider, TrackContext };
