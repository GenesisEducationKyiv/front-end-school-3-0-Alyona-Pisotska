import { createContext } from 'react';
import { O } from '@mobily/ts-belt';
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
  useDeleteMultiTracks,
  useGenreContext,
  useQueryParamsContext,
} from '@/hooks/hooks';
import { ORDER_BY, TRACK_TABLE_CELL_IDS, QUERY_PARAM_KEYS } from '@/lib/constants/constants';

import type { Track, PaginationMeta, Order, TrackListSort, TrackPayload } from '@/lib/types/types';

const INITIAL_PAGE = 1;

type TrackContextProviderProps = {
  children: React.ReactNode;
};

type RequiredAudioFile = Exclude<Track['audioFile'], undefined>;

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
  handleDeleteMultiTracks: (ids: Track['id'][]) => Promise<void>;
  handleAddAudioTrack: (id: Track['id'], audioFile: RequiredAudioFile) => void;
  handleDeleteAudioTrack: (id: Track['id']) => void;
  handleChangeSearchArtist: (value: string) => void;
};

const TrackContext = createContext<TTrackContext | null>(null);

const TrackContextProvider = ({ children }: TrackContextProviderProps) => {
  const { getIntParam, set } = useQueryParamsContext();

  const [trackList, setTrackList] = useState<Track[]>([]);
  const [orderBy, setOrderBy] = useState<Order>(ORDER_BY.asc);
  const [sortBy, setSortBy] = useState<TrackListSort>(TRACK_TABLE_CELL_IDS.artist);
  const [searchArtist, setSearchArtist] = useState('');

  const rawPage = getIntParam(QUERY_PARAM_KEYS.page);
  const page = O.getWithDefault(rawPage, INITIAL_PAGE);

  const { debouncedSearchText } = useSearchTextContext();
  const { selectedGenre } = useGenreContext();

  const { createNewTrack } = useCreateTrack();
  const { editTrack } = useEditTrack();
  const { deleteTrack } = useDeleteTrack();
  const { deleteMultiTracks } = useDeleteMultiTracks();

  const {
    trackList: fetchedTrackList,
    paginationData,
    isLoadingTrackList,
    isSuccessTrackList,
  } = useGetTrackList({
    page,
    sort: sortBy,
    order: orderBy,
    search: debouncedSearchText,
    genre: selectedGenre,
    artist: searchArtist,
  });

  const resetPageToDefault = useCallback(() => {
    set(QUERY_PARAM_KEYS.page, INITIAL_PAGE);
  }, [set]);

  const totalPages = useMemo(() => {
    return paginationData?.totalPages ?? 1;
  }, [paginationData?.totalPages]);

  useEffect(() => {
    if (!isLoadingTrackList && isSuccessTrackList) {
      setTrackList(fetchedTrackList);
    }
  }, [isLoadingTrackList, isSuccessTrackList, fetchedTrackList]);

  useEffect(() => {
    if (O.isNone(rawPage)) {
      set(QUERY_PARAM_KEYS.page, INITIAL_PAGE, { replace: true });
    }
  }, [rawPage, set]);

  useEffect(() => {
    if (debouncedSearchText || selectedGenre || searchArtist) {
      set(QUERY_PARAM_KEYS.page, INITIAL_PAGE);
    }
  }, [debouncedSearchText, selectedGenre, searchArtist, set]);

  const handleChangeOrder = useCallback(
    (newOrder: Order) => {
      resetPageToDefault();
      setOrderBy(newOrder);
    },
    [resetPageToDefault],
  );

  const handleChangeSort = useCallback(
    (newSort: TrackListSort) => {
      resetPageToDefault();
      setSortBy(newSort);
    },
    [resetPageToDefault],
  );

  const handleChangePage = useCallback(
    (newPage: number) => {
      set(QUERY_PARAM_KEYS.page, newPage);
    },
    [set],
  );

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
    } catch {
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

  const handleDeleteMultiTracks = useCallback(
    async (trackIds: Track['id'][]) => {
      await deleteMultiTracks({ ids: trackIds });
    },
    [deleteMultiTracks],
  );

  const handleAddAudioTrack = useCallback((trackId: Track['id'], audioUrl: RequiredAudioFile) => {
    setTrackList((prevState) => {
      return prevState.map((track) => {
        if (track.id === trackId) {
          return { ...track, audioFile: audioUrl };
        }

        return track;
      });
    });
  }, []);

  const handleDeleteAudioTrack = useCallback((trackId: Track['id']) => {
    setTrackList((prevState) => {
      return prevState.map((track) => {
        if (track.id === trackId) {
          return { ...track, audioFile: '' };
        }

        return track;
      });
    });
  }, []);

  const handleChangeSearchArtist = useCallback((value: string) => {
    setSearchArtist(value);
  }, []);

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
        handleDeleteMultiTracks,
        handleAddAudioTrack,
        handleDeleteAudioTrack,
        handleChangeSearchArtist,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export { TrackContextProvider, TrackContext };
