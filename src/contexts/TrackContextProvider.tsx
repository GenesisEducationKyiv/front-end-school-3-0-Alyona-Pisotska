import { createContext } from 'react';
import { useGetTrackList, useState, useMemo } from '@/hooks/hooks.ts';
import { ORDER_BY, TRACK_TABLE_CELL_IDS } from '@/lib/constants/constants.ts';

import type { Track, PaginationMeta, Order, TrackListSort } from '@/lib/types/types.ts';

const INITIAL_PAGE = 1;

type TrackContextProvider = {
  children: React.ReactNode;
};

type TTrackContext = {
  tracks: Track[];
  paginationData: PaginationMeta | null;
  isLoadingTrackList: boolean;
  page: number;
  totalPages: number;
  handleChangeOrder: (value: Order) => void;
  handleChangeSort: (value: TrackListSort) => void;
  handleChangePage: (value: number) => void;
};

const TrackContext = createContext<TTrackContext | null>(null);

function TrackContextProvider({ children }: TrackContextProvider) {
  const [orderBy, setOrderBy] = useState<Order>(ORDER_BY.asc);
  const [sortBy, setSortBy] = useState<TrackListSort>(TRACK_TABLE_CELL_IDS.artist);
  const [page, setPage] = useState(INITIAL_PAGE);

  const { trackList, paginationData, isLoadingTrackList } = useGetTrackList({
    page,
    sort: sortBy,
    order: orderBy,
  });

  const totalPages = useMemo(() => {
    return paginationData?.totalPages || 0;
  }, [paginationData?.totalPages]);

  const handleChangeOrder = (newOrder: Order) => {
    setOrderBy(newOrder);
  };

  const handleChangeSort = (newSort: TrackListSort) => {
    setSortBy(newSort);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <TrackContext.Provider
      value={{
        tracks: trackList,
        paginationData,
        isLoadingTrackList,
        handleChangeOrder,
        handleChangeSort,
        page,
        totalPages,
        handleChangePage,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
}

export { TrackContextProvider, TrackContext };
