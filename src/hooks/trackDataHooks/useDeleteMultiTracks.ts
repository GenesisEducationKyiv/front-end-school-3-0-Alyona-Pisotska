import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { fetcherPost } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type DeleteTracksPayload = {
  ids: Track['id'][];
};

export const useDeleteMultiTracks = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteMultiTracks } = useMutation<void, AxiosError, DeleteTracksPayload>({
    mutationFn: async ({ ids }) => {
      await fetcherPost<void, DeleteTracksPayload>(`${URL}/delete`, { ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [URL] });
    },
  });

  return { deleteMultiTracks };
};
