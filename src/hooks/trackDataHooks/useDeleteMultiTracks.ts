import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { fetcherPost } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type DeleteTracksPayload = {
  ids: Track['id'][];
};

export const useDeleteMultiTracks = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteMultiTracks } = useMutation<void, Error, DeleteTracksPayload>({
    mutationFn: async (payload) => {
      const result = await fetcherPost<void, DeleteTracksPayload>(`${URL}/delete`, payload);

      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
    },
    onSuccess: () => {
      toast.success('Tracks are deleted');
      queryClient.invalidateQueries({ queryKey: [URL] });
    },
    onError: (error) => {
      toast.error(`Error! ${error.message || 'Something went wrong'}`);
    },
  });

  return { deleteMultiTracks };
};
