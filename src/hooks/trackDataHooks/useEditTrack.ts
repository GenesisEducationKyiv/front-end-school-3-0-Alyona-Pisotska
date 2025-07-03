import { useAppMutation } from '@/hooks/hooks';
import { fetcherPut } from '@/lib/api/api';
import { API_ENDPOINTS } from '@/lib/constants/constants';
import { trackSchema } from '@/lib/validation-schema/validation-schema';

import type { Track, TrackPayload } from '@/lib/types/types';

const URL = API_ENDPOINTS.trackList;

type EditTrackPayload = { id: Track['id']; payload: TrackPayload };

const useEditTrack = () => {
  const { mutateAsync: editTrack } = useAppMutation({
    mutationFn: ({ id, payload }: EditTrackPayload) => {
      return fetcherPut<Track, TrackPayload>(`${URL}/${id}`, payload, {}, trackSchema);
    },
    successMessage: 'Track is updated',
    invalidateQueryKey: [URL],
  });

  return { editTrack };
};

export { useEditTrack };
