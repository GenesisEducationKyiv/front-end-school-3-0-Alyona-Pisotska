import { useEffect, useGetTrackList } from '@/hooks/hooks';
import { useTrackStore } from '@/stores/stores';

import type { TrackListQueryParams } from '@/lib/types/types';

const useSyncTrackStore = (params: TrackListQueryParams) => {
  const initializeTracks = useTrackStore((state) => state.initializeTracks);
  const setTotalPages = useTrackStore((state) => state.setTotalPages);
  const setIsLoading = useTrackStore((state) => state.setIsLoading);
  const { trackList, paginationData, isSuccessTrackList, isLoadingTrackList } = useGetTrackList(params);

  useEffect(() => {
    setIsLoading(isLoadingTrackList);
  }, [setIsLoading, isLoadingTrackList]);

  useEffect(() => {
    if (isSuccessTrackList && !isLoadingTrackList) {
      initializeTracks(trackList);
      setTotalPages(paginationData?.totalPages ?? 1);
    }
  }, [trackList, isSuccessTrackList, isLoadingTrackList, initializeTracks, paginationData?.totalPages, setTotalPages]);
};

export { useSyncTrackStore };
