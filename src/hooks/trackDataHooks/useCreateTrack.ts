import { useAppMutation } from '@/hooks/hooks';
import { fetcherPost } from '@/lib/api/api';
import { trackSchema } from '@/lib/validation-schema/validation-schema';
import { API_ENDPOINTS } from '@/lib/constants/constants';

import type { Track, TrackPayload } from '@/lib/types/types';

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
