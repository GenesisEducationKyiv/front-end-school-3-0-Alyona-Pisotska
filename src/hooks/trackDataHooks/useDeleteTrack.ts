import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { fetcherDelete } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type DeleteTrackPayload = { id: Track['id'] };

const useDeleteTrack = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTrack } = useMutation<void, Error, DeleteTrackPayload>({
    mutationFn: async ({ id }: DeleteTrackPayload) => {
      const result = await fetcherDelete<void>(`${URL}/${id}`);

      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
    },
    onSuccess: () => {
      toast.success('Track is deleted');
      queryClient.invalidateQueries({ queryKey: [URL] }).catch((error: unknown) => {
        const err = error instanceof Error ? error : new Error('Unknown error');
        toast.error(`Failed to refresh track list: ${err.message}`);
      });
    },
    onError: (error) => toast.error(`Error! ${error.message || 'Something went wrong'}`),
  });

  return { deleteTrack };
};

export { useDeleteTrack };
