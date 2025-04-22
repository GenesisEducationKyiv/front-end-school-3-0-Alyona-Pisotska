import { createContext } from 'react';
import {
  useGetTrackList,
  useState,
  useMemo,
  useSearchTextContext,
  useCreateTrack,
  useEditTrack,
} from '@/hooks/hooks.ts';
import { ORDER_BY, TRACK_TABLE_CELL_IDS } from '@/lib/constants/constants.ts';

import type { Track, PaginationMeta, Order, TrackListSort, TrackPayload } from '@/lib/types/types.ts';

const INITIAL_PAGE = 1;

type TrackContextProviderProps = {
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
  handleAddTrack: (value: TrackPayload) => Promise<void>;
  handleEditTrack: (id: Track['id'], value: TrackPayload) => Promise<void>;
};

const TrackContext = createContext<TTrackContext | null>(null);

const TrackContextProvider = ({ children }: TrackContextProviderProps) => {
  const [orderBy, setOrderBy] = useState<Order>(ORDER_BY.asc);
  const [sortBy, setSortBy] = useState<TrackListSort>(TRACK_TABLE_CELL_IDS.artist);
  const [page, setPage] = useState(INITIAL_PAGE);
  const { debouncedSearchText } = useSearchTextContext();

  const { createNewTrack } = useCreateTrack();
  const { editTrack } = useEditTrack();

  const { trackList, paginationData, isLoadingTrackList } = useGetTrackList({
    page,
    sort: sortBy,
    order: orderBy,
    search: debouncedSearchText,
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

  const handleAddTrack = async (newTrack: TrackPayload) => {
    await createNewTrack(newTrack);
  };

  const handleEditTrack = async (trackId: Track['id'], editTrackData: TrackPayload) => {
    await editTrack({ id: trackId, payload: editTrackData });
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
        handleAddTrack,
        handleEditTrack,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export { TrackContextProvider, TrackContext };
