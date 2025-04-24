import { toast } from 'sonner';
import { useEffect, useMemo, useQuery } from '@/hooks/hooks.ts';
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

const useGetTrackList = ({ page, sort, order, search, genre, artist }: TrackListQueryParams) => {
  const { isFetching, data, error } = useQuery<TrackListResponse>({
    queryKey: [URL, page, sort, order, search, genre, artist],
    queryFn: () => {
      const params = new URLSearchParams();

      params.append('page', page.toString());
      params.append('limit', LIMIT.toString());
      params.append('sort', sort);
      params.append('order', order);
      search?.length && params.append('search', search);
      genre?.length && params.append('genre', genre);
      artist?.length && params.append('artist', artist);

      return fetcherGet<TrackListResponse>(URL, { params });
    },
  });

  const processedData = useMemo(() => {
    return processTrackList(data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(`Error! ${error.message || 'Something went wrong'}`);
    }
  }, [error]);

  return {
    trackList: processedData.trackList,
    paginationData: processedData.paginationData,
    isLoadingTrackList: isFetching,
  };
};

export { useGetTrackList };
