import { createContext } from 'react';
import { useGetTrackList } from '@/hooks/hooks.ts';

import { Track, PaginationMeta } from '@/lib/types/types.ts';

type TrackContextProvider = {
  children: React.ReactNode;
};

type TTrackContext = {
  tracks: Track[];
  paginationData: PaginationMeta | null;
  isLoadingTrackList: boolean;
};

const TrackContext = createContext<TTrackContext | null>(null);

function TrackContextProvider({ children }: TrackContextProvider) {
  const { trackList, paginationData, isLoadingTrackList } = useGetTrackList();

  return (
    <TrackContext.Provider
      value={{
        tracks: trackList,
        paginationData,
        isLoadingTrackList,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
}

export { TrackContextProvider, TrackContext };
