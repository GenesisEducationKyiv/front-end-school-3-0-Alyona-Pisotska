import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { fetcherPost } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { NewTrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type NewTrack = NewTrackPayload;

const useCreateTrack = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createNewTrack } = useMutation<NewTrack, Error, NewTrackPayload>({
    mutationFn: (payload) => {
      return fetcherPost<NewTrack, NewTrackPayload>(URL, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [URL] });
    },
  });

  return { createNewTrack };
};

export { useCreateTrack };
