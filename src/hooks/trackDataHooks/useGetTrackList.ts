import { toast } from 'sonner';
import { useEffect, useQuery } from '@/hooks/hooks.ts';
import { fetcherGet } from '@/lib/api/api.ts';
import { trackListResponseSchema } from '@/lib/validation-schema/validation-schema.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { z } from 'zod';
import type { TrackListQueryParams } from '@/lib/types/types.ts';

const LIMIT = 10;
const URL = API_ENDPOINTS.trackList;

type TrackListResponse = z.infer<typeof trackListResponseSchema>;

const useGetTrackList = ({ page, sort, order, search, genre, artist }: TrackListQueryParams) => {
  const { isFetching, data, error } = useQuery({
    queryKey: [URL, page, sort, order, search, genre, artist],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', LIMIT.toString());
      params.append('sort', sort);
      params.append('order', order);
      search?.length && params.append('search', search);
      genre?.length && params.append('genre', genre);
      artist?.length && params.append('artist', artist);

      const result = await fetcherGet<TrackListResponse>(URL, { params }, trackListResponseSchema);

      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(`Error! ${error.message || 'Something went wrong'}`);
    }
  }, [error]);

  return {
    trackList: data?.data ?? [],
    paginationData: data?.meta ?? null,
    isLoadingTrackList: isFetching,
  };
};

export { useGetTrackList };
