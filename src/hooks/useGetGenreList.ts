import { toast } from 'sonner';
import { useEffect, useQuery } from '@/hooks/hooks';
import { fetcherGet } from '@/lib/api/api';
import { genreListSchema } from '@/lib/validation-schema/validation-schema';
import { API_ENDPOINTS } from '@/lib/constants/constants';

import type { z } from 'zod';

const URL = API_ENDPOINTS.genres;

type GenreListResponse = z.infer<typeof genreListSchema>;

const useGetGenreList = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: [URL],
    queryFn: async () => {
      const result = await fetcherGet<GenreListResponse>(URL, {}, genreListSchema);

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
    genreList: data ?? [],
    isLoading: isFetching,
  };
};

export { useGetGenreList };
