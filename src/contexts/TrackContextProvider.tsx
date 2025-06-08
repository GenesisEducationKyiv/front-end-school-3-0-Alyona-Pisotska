import { createContext } from 'react';
import { useTrackQueryParams, useTrackListState } from '@/hooks/hooks';

type TrackContextProviderProps = {
  children: React.ReactNode;
};

type TrackState = ReturnType<typeof useTrackListState>;
type TrackParams = ReturnType<typeof useTrackQueryParams>;

type TTrackContext = TrackState &
  Pick<
    TrackParams,
    'page' | 'searchArtist' | 'handleChangeOrder' | 'handleChangeSort' | 'handleChangePage' | 'handleChangeSearchArtist'
  >;

const TrackContext = createContext<TTrackContext | null>(null);

const TrackContextProvider = ({ children }: TrackContextProviderProps) => {
  const {
    search,
    searchArtist,
    selectedGenre,
    page,
    orderBy,
    sortBy,
    handleChangeOrder,
    handleChangeSort,
    handleChangeSearchArtist,
    handleChangePage,
  } = useTrackQueryParams();

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
    search,
    sort: sortBy,
    order: orderBy,
    genre: selectedGenre,
    artist: searchArtist,
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
