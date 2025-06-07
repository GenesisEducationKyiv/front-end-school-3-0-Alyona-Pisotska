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
import {
  getValidatedOrDefaultQueryParam,
  isTrackListSortableColumn,
  isValidOrder,
  isValidQueryParam,
} from '@/lib/utils/utils';
import { ORDER_BY, TRACK_TABLE_CELL_IDS, QUERY_PARAM_KEYS } from '@/lib/constants/constants';

import type { Track, PaginationMeta, Order, TrackListSort, TrackPayload } from '@/lib/types/types';

const INITIAL_PAGE = 1;
const DEFAULT_ORDER_BY = ORDER_BY.asc as Order;
const DEFAULT_SORT_BY = TRACK_TABLE_CELL_IDS.artist as TrackListSort;

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
  const { get, getIntParam, set, setMany } = useQueryParamsContext();

  const [trackList, setTrackList] = useState<Track[]>([]);
  const [searchArtist, setSearchArtist] = useState('');

  const rawPage = getIntParam(QUERY_PARAM_KEYS.page);
  const rawOrderBy = get(QUERY_PARAM_KEYS.orderBy);
  const rawSortBy = get(QUERY_PARAM_KEYS.sortBy);

  const page = O.getWithDefault(rawPage, INITIAL_PAGE);
  const orderBy = getValidatedOrDefaultQueryParam(rawOrderBy, isValidOrder, DEFAULT_ORDER_BY);
  const sortBy = getValidatedOrDefaultQueryParam(rawSortBy, isTrackListSortableColumn, DEFAULT_SORT_BY);

  const isValidPageParamInUrl = isValidQueryParam(rawPage, (page) => page >= INITIAL_PAGE);
  const isValidOrderParamInUrl = isValidQueryParam(rawOrderBy, isValidOrder);
  const isValidSortParamInUrl = isValidQueryParam(rawSortBy, isTrackListSortableColumn);

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

  const totalPages = useMemo(() => {
    return paginationData?.totalPages ?? 1;
  }, [paginationData?.totalPages]);

  useEffect(() => {
    if (!isLoadingTrackList && isSuccessTrackList) {
      setTrackList(fetchedTrackList);
    }
  }, [isLoadingTrackList, isSuccessTrackList, fetchedTrackList]);

  useEffect(() => {
    if (!isValidPageParamInUrl) {
      set(QUERY_PARAM_KEYS.page, INITIAL_PAGE, { replace: true });
    }
  }, [isValidPageParamInUrl, set]);

  useEffect(() => {
    if (!isValidOrderParamInUrl) {
      set(QUERY_PARAM_KEYS.orderBy, DEFAULT_ORDER_BY, { replace: true });
    }
  }, [isValidOrderParamInUrl, set]);

  useEffect(() => {
    if (!isValidSortParamInUrl) {
      set(QUERY_PARAM_KEYS.sortBy, DEFAULT_SORT_BY, { replace: true });
    }
  }, [isValidSortParamInUrl, set]);

  useEffect(() => {
    if (debouncedSearchText || selectedGenre || searchArtist) {
      set(QUERY_PARAM_KEYS.page, INITIAL_PAGE);
    }
  }, [debouncedSearchText, selectedGenre, searchArtist, set]);

  const handleChangeOrder = useCallback(
    (newOrder: Order) => {
      setMany({
        [QUERY_PARAM_KEYS.page]: INITIAL_PAGE,
        [QUERY_PARAM_KEYS.orderBy]: newOrder,
      });
    },
    [setMany],
  );

  const handleChangeSort = useCallback(
    (newSort: TrackListSort) => {
      setMany({
        [QUERY_PARAM_KEYS.page]: INITIAL_PAGE,
        [QUERY_PARAM_KEYS.sortBy]: newSort,
      });
    },
    [setMany],
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
