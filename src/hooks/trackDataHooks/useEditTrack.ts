import { useAppMutation } from '@/hooks/hooks.ts';
import { fetcherPut } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';
import { trackSchema } from '@/lib/validation-schema/validation-schema.ts';

import type { Track, TrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type EditTrackPayload = { id: Track['id']; payload: TrackPayload };

const useEditTrack = () => {
  const { mutateAsync: editTrack } = useAppMutation({
    mutationFn: ({ id, payload }: EditTrackPayload) => {
      return fetcherPut<Track, TrackPayload>(`${URL}/${id}`, payload, {}, trackSchema);
    },
    successMessage: 'Track is updated',
  });

  return { editTrack };
};

export { useEditTrack };
