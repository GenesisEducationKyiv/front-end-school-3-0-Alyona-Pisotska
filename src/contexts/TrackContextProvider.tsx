import React, { createContext } from 'react';
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
} from '@/hooks/hooks.ts';
import { ORDER_BY, TRACK_TABLE_CELL_IDS } from '@/lib/constants/constants.ts';

import type { Track, PaginationMeta, Order, TrackListSort, TrackPayload } from '@/lib/types/types.ts';

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
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [orderBy, setOrderBy] = useState<Order>(ORDER_BY.asc);
  const [sortBy, setSortBy] = useState<TrackListSort>(TRACK_TABLE_CELL_IDS.artist);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [searchArtist, setSearchArtist] = useState('');

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
  } = useGetTrackList({
    page,
    sort: sortBy,
    order: orderBy,
    search: debouncedSearchText,
    genre: selectedGenre,
    artist: searchArtist,
  });

  useEffect(() => {
    if (fetchedTrackList.length > 0) {
      setTrackList(fetchedTrackList);
    }
  }, [fetchedTrackList]);

  useEffect(() => {
    setPage(INITIAL_PAGE);
  }, [debouncedSearchText, selectedGenre, searchArtist]);

  const totalPages = useMemo(() => {
    return paginationData?.totalPages ?? 1;
  }, [paginationData?.totalPages]);

  const handleChangeOrder = useCallback((newOrder: Order) => {
    setPage(INITIAL_PAGE);
    setOrderBy(newOrder);
  }, []);

  const handleChangeSort = useCallback((newSort: TrackListSort) => {
    setPage(INITIAL_PAGE);
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
