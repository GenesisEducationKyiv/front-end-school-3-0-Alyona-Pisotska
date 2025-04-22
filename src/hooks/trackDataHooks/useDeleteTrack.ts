import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { AxiosError } from 'axios';
import { fetcherDelete } from '@/lib/utils/utils';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type DeleteTrackVariables = { id: Track['id'] };

const useDeleteTrack = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTrack } = useMutation<void, AxiosError, DeleteTrackVariables>({
    mutationFn: async ({ id }) => {
      await fetcherDelete(`${URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [URL] });
    },
  });

  return { deleteTrack };
};

export { useDeleteTrack };
