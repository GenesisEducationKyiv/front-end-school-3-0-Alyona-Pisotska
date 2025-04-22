import { useMemo, useQuery } from '@/hooks/hooks.ts';
import { fetcherGet } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.genres;

const processGenreList = (data: Track['genre'] | undefined) => {
  return {
    genreList: data || [],
  };
};

const useGetGenreList = () => {
  const { isFetching, data } = useQuery<Track['genre']>({
    queryKey: [API_ENDPOINTS.genres],
    queryFn: () => fetcherGet<Track['genre']>(URL),
  });

  const processedData = useMemo(() => {
    return processGenreList(data);
  }, [data]);

  return {
    genreList: processedData.genreList,
    isLoading: isFetching,
  };
};

export { useGetGenreList };
