import { useMemo, useQuery } from '@/hooks/hooks.ts';
import { fetcherGet } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { TrackListResponse, TrackListQueryParams } from '@/lib/types/types.ts';

const LIMIT = 10;
const URL = API_ENDPOINTS.trackList;

const processTrackList = (data: TrackListResponse | undefined) => {
  return {
    trackList: data?.data || [],
    paginationData: data?.meta || null,
  };
};

const useGetTrackList = ({ page, sort, order, search }: TrackListQueryParams) => {
  const { isFetching, data } = useQuery<TrackListResponse>({
    queryKey: [URL, page, sort, order, search],
    queryFn: () => {
      const params = new URLSearchParams();

      params.append('page', page.toString());
      params.append('limit', LIMIT.toString());
      params.append('sort', sort);
      params.append('order', order);
      search?.length && params.append('search', search);

      return fetcherGet<TrackListResponse>(URL, { params });
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
