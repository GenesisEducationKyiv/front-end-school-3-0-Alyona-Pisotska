import { createContext } from 'react';
import {
  useGetTrackList,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useSearchTextContext,
  useCreateTrack,
  useEditTrack,
  useDeleteTrack,
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
  handleDeleteTrack: (id: Track['id']) => Promise<void>;
};

const TrackContext = createContext<TTrackContext | null>(null);

const TrackContextProvider = ({ children }: TrackContextProviderProps) => {
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [orderBy, setOrderBy] = useState<Order>(ORDER_BY.asc);
  const [sortBy, setSortBy] = useState<TrackListSort>(TRACK_TABLE_CELL_IDS.artist);
  const [page, setPage] = useState(INITIAL_PAGE);
  const { debouncedSearchText } = useSearchTextContext();

  const { createNewTrack } = useCreateTrack();
  const { editTrack } = useEditTrack();
  const { deleteTrack } = useDeleteTrack();

  const {
    trackList: fetchedTrackList,
    paginationData,
    isLoadingTrackList,
  } = useGetTrackList({
    page,
    sort: sortBy,
    order: orderBy,
    search: debouncedSearchText,
  });

  useEffect(() => {
    if (fetchedTrackList) {
      setTrackList(fetchedTrackList);
    }
  }, [fetchedTrackList]);

  const totalPages = useMemo(() => {
    return paginationData?.totalPages ?? 1;
  }, [paginationData?.totalPages]);

  const handleChangeOrder = useCallback((newOrder: Order) => {
    setOrderBy(newOrder);
  }, []);

  const handleChangeSort = useCallback((newSort: TrackListSort) => {
    setSortBy(newSort);
  }, []);

  const handleChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleAddTrack = useCallback(
    async (newTrack: TrackPayload) => {
      await createNewTrack(newTrack);
    },
    [createNewTrack],
  );

  const handleEditTrack = async (trackId: Track['id'], editTrackData: TrackPayload) => {
    const previousTrack = trackList.find((track) => track.id === trackId);

    setTrackList((prevState) => {
      return prevState.map((track) => {
        if (track.id === trackId) {
          return { ...track, ...editTrackData };
        }

        return track;
      });
    });

    try {
      await editTrack({ id: trackId, payload: editTrackData });
    } catch (error) {
      if (previousTrack) {
        setTrackList((prevState) => {
          return prevState.map((track) => {
            if (track.id === trackId) {
              return { ...track, ...previousTrack };
            }

            return track;
          });
        });
      }
    }
  };

  const handleDeleteTrack = useCallback(
    async (trackId: Track['id']) => {
      await deleteTrack({ id: trackId });
    },
    [deleteTrack],
  );

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
        handleDeleteTrack,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export { TrackContextProvider, TrackContext };
