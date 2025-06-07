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
  useDebounce,
} from '@/hooks/hooks';
import {
  getValidatedOrDefaultQueryParam,
  isTrackListSortableColumn,
  isValidOrder,
  isValidQueryParam,
  setParamWithResetPage,
} from '@/lib/utils/utils';
import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

import type { Track, PaginationMeta, Order, TrackListSort, TrackPayload } from '@/lib/types/types';

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
  searchArtist: string;
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
  const { debouncedSearchText } = useSearchTextContext();
  const { selectedGenre } = useGenreContext();

  const { createNewTrack } = useCreateTrack();
  const { editTrack } = useEditTrack();
  const { deleteTrack } = useDeleteTrack();
  const { deleteMultiTracks } = useDeleteMultiTracks();

  const [trackList, setTrackList] = useState<Track[]>([]);

  const rawPage = getIntParam(QUERY_PARAM_KEYS.page);
  const rawOrderBy = get(QUERY_PARAM_KEYS.orderBy);
  const rawSortBy = get(QUERY_PARAM_KEYS.sortBy);
  const rawSearchArtist = get(QUERY_PARAM_KEYS.searchArtist);

  const page = O.getWithDefault(rawPage, INITIAL_QUERY_PARAMS_VALUE.page);
  const orderBy = getValidatedOrDefaultQueryParam(rawOrderBy, isValidOrder, INITIAL_QUERY_PARAMS_VALUE.orderBy);
  const sortBy = getValidatedOrDefaultQueryParam(
    rawSortBy,
    isTrackListSortableColumn,
    INITIAL_QUERY_PARAMS_VALUE.sortBy,
  );
  const searchArtist = O.getWithDefault(rawSearchArtist, INITIAL_QUERY_PARAMS_VALUE.search);
  const debouncedSearchArtist = useDebounce(searchArtist, 250);

  const isValidPageParamInUrl = isValidQueryParam(rawPage, (page) => page >= INITIAL_QUERY_PARAMS_VALUE.page);
  const isValidOrderParamInUrl = isValidQueryParam(rawOrderBy, isValidOrder);
  const isValidSortParamInUrl = isValidQueryParam(rawSortBy, isTrackListSortableColumn);

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
    artist: debouncedSearchArtist,
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
      set(QUERY_PARAM_KEYS.page, INITIAL_QUERY_PARAMS_VALUE.page, { replace: true });
    }
  }, [isValidPageParamInUrl, set]);

  useEffect(() => {
    if (!isValidOrderParamInUrl) {
      set(QUERY_PARAM_KEYS.orderBy, INITIAL_QUERY_PARAMS_VALUE.orderBy, { replace: true });
    }
  }, [isValidOrderParamInUrl, set]);

  useEffect(() => {
    if (!isValidSortParamInUrl) {
      set(QUERY_PARAM_KEYS.sortBy, INITIAL_QUERY_PARAMS_VALUE.sortBy, { replace: true });
    }
  }, [isValidSortParamInUrl, set]);

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

  const handleChangeSearchArtist = useCallback(
    (value: string) => {
      setParamWithResetPage(QUERY_PARAM_KEYS.searchArtist, value, setMany);
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
        searchArtist,
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
