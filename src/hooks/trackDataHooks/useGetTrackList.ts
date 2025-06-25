import { toast } from 'sonner';
import {
  useEffect,
  usePageQueryParam,
  useQuery,
  useSearchArtistQueryParam,
  useSearchQueryParam,
  useSelectGenreQueryParam,
  useSortQueryParams,
} from '@/hooks/hooks';
import { fetcherGet } from '@/lib/api/api';
import { trackListResponseSchema } from '@/lib/validation-schema/validation-schema';
import { API_ENDPOINTS } from '@/lib/constants/constants';

import type { z } from 'zod';

const LIMIT = 10;
const URL = API_ENDPOINTS.trackList;

type TrackListResponse = z.infer<typeof trackListResponseSchema>;

const useGetTrackList = () => {
  const { page } = usePageQueryParam();
  const { selectedGenre } = useSelectGenreQueryParam();
  const { sortBy, orderBy } = useSortQueryParams();
  const { debouncedSearchArtist } = useSearchArtistQueryParam();
  const { debouncedSearchText } = useSearchQueryParam();

  const {
    isFetching,
    isSuccess,
    data: responseData,
    error,
  } = useQuery({
    queryKey: [URL, page, sortBy, orderBy, debouncedSearchText, selectedGenre, debouncedSearchArtist],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', LIMIT.toString());
      params.append('sort', sortBy);
      params.append('order', orderBy);
      debouncedSearchText?.length && params.append('search', debouncedSearchText);
      selectedGenre?.length && params.append('genre', selectedGenre);
      debouncedSearchArtist?.length && params.append('artist', debouncedSearchArtist);

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
    trackList: responseData?.data ?? [],
    paginationData: responseData?.meta ?? null,
    totalPages: responseData?.meta?.totalPages ?? 0,
    isLoadingTrackList: isFetching,
    isSuccessTrackList: isSuccess,
  };
};

export { useGetTrackList };
