import { useAppMutation } from '@/hooks/hooks.ts';
import { fetcherPost } from '@/lib/api/api.ts';
import { trackSchema } from '@/lib/validation-schema/validation-schema.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track, TrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

const useCreateTrack = () => {
  const { mutateAsync: createNewTrack } = useAppMutation({
    mutationFn: (payload: TrackPayload) => {
      return fetcherPost<Track, TrackPayload>(URL, payload, {}, trackSchema);
    },
    successMessage: 'Track is created',
    invalidateQueryKey: [URL],
  });

  return { createNewTrack };
};

export { useCreateTrack };
