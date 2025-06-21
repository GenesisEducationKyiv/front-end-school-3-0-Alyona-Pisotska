import { createContext } from 'react';
import {
  useTrackListState,
  usePageQueryParam,
  useSortQueryParams,
  useSearchArtistQueryParam,
  useSelectGenreQueryParam,
  useSearchQueryParam,
} from '@/hooks/hooks';

import type { Order, TrackListSort } from '@/lib/types/types';

type TrackContextProviderProps = {
  children: React.ReactNode;
};

type TrackState = ReturnType<typeof useTrackListState>;
type TrackParams = {
  searchArtist: string;
  page: number;
  handleChangeOrder: (value: Order) => void;
  handleChangeSort: (value: TrackListSort) => void;
  handleChangePage: (value: number) => void;
  handleChangeSearchArtist: (value: string) => void;
};

type TTrackContext = TrackState & TrackParams;

const TrackContext = createContext<TTrackContext | null>(null);

const TrackContextProvider = ({ children }: TrackContextProviderProps) => {
  const { page, handleChangePage } = usePageQueryParam();
  const { sortBy, orderBy, handleChangeSort, handleChangeOrder } = useSortQueryParams();
  const { searchArtist, debouncedSearchArtist, handleChangeSearchArtist } = useSearchArtistQueryParam();
  const { selectedGenre } = useSelectGenreQueryParam();
  const { debouncedSearchText } = useSearchQueryParam();

  const {
    tracks,
    paginationData,
    isLoadingTrackList,
    totalPages,
    handleAddTrack,
    handleEditTrack,
    handleDeleteTrack,
    handleDeleteMultiTracks,
    handleAddAudioTrack,
    handleDeleteAudioTrack,
  } = useTrackListState({
    page,
    search: debouncedSearchText,
    sort: sortBy,
    order: orderBy,
    genre: selectedGenre,
    artist: debouncedSearchArtist,
  });

  return (
    <TrackContext.Provider
      value={{
        tracks,
        paginationData,
        isLoadingTrackList,
        handleChangeOrder,
        handleChangeSort,
        page,
        totalPages,
        searchArtist,
        handleChangePage,
        handleChangeSearchArtist,
        handleAddTrack,
        handleEditTrack,
        handleDeleteTrack,
        handleDeleteMultiTracks,
        handleAddAudioTrack,
        handleDeleteAudioTrack,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export { TrackContextProvider, TrackContext };
