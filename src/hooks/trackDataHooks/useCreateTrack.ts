import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { toast } from 'sonner';
import { Result } from 'neverthrow';
import { fetcherPost } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { TrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type NewTrack = TrackPayload;

const useCreateTrack = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createNewTrack } = useMutation<NewTrack, Error, TrackPayload>({
    mutationFn: async (payload) => {
      const result: Result<NewTrack, Error> = await fetcherPost<NewTrack, TrackPayload>(URL, payload);

      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
    },
    onSuccess: () => {
      toast.success('Track is created');
      queryClient.invalidateQueries({ queryKey: [URL] });
    },
    onError: (error) => {
      toast.error(`Error! ${error.message || 'Something went wrong'}`);
    },
  });

  return { createNewTrack };
};

export { useCreateTrack };
