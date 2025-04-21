import { useMemo } from '@/hooks/hooks.ts';
import { useQuery } from '@tanstack/react-query';
import { fetcherGet } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { TrackListResponse } from '@/lib/types/types.ts';

const processTrackList = (data: TrackListResponse | undefined) => {
  return {
    trackList: data?.data || [],
    paginationData: data?.meta || null,
  };
};

const useGetTrackList = ({ page, limit, sort, order }) => {
  const { isFetching, data } = useQuery<TrackListResponse>({
    queryKey: [API_ENDPOINTS.trackList, page, limit, sort, order],
    queryFn: ({ queryKey }) => {
      const [url] = queryKey;
      const params = new URLSearchParams();

      params.append('page', page);
      params.append('limit', limit);
      params.append('sort', sort);
      params.append('order', order);

      return fetcherGet<TrackListResponse>(url, { params });
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
