import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { toast } from 'sonner';
import { fetcherPost } from '@/lib/api/api.ts';
import { trackSchema } from '@/lib/validation-schema/validation-schema.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track, TrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

const useCreateTrack = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createNewTrack } = useMutation<Track, Error, TrackPayload>({
    mutationFn: async (payload: TrackPayload) => {
      const result = await fetcherPost<Track, TrackPayload>(URL, payload, {}, trackSchema);

      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
    },
    onSuccess: () => {
      toast.success('Track is created');
      queryClient.invalidateQueries({ queryKey: [URL] }).catch((error: unknown) => {
        const err = error instanceof Error ? error : new Error('Unknown error');
        toast.error(`Failed to refresh track list: ${err.message}`);
      });
    },
    onError: (error) => toast.error(`Error! ${error.message || 'Something went wrong'}`),
  });

  return { createNewTrack };
};

export { useCreateTrack };
