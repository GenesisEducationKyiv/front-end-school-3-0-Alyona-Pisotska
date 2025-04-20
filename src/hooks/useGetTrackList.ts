import { useMemo } from '@/hooks/hooks.ts';
import { useQuery } from '@tanstack/react-query';
import { fetcherGet } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import { TrackListResponse } from '@/lib/types/types.ts';

const processTrackList = (data: TrackListResponse | undefined) => {
  return {
    trackList: data?.data || [],
    paginationData: data?.meta || null,
  };
};

const useGetTrackList = () => {
  const { isFetching, data } = useQuery<TrackListResponse>({
    queryKey: [API_ENDPOINTS.trackList],
    queryFn: ({ queryKey }) => {
      const [url] = queryKey;

      return fetcherGet<TrackListResponse>(url);
    },
  });

  const processedData = useMemo(() => {
    return processTrackList(data);
  }, [data]);

  return {
    trackList: processedData.trackList,
    paginationData: processedData.paginationData,
    isLoadingTrackList: isFetching,
  };
};

export { useGetTrackList };
