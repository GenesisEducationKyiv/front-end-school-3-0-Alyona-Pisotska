import { toast } from 'sonner';
import { useMutation } from '@/hooks/hooks.ts';
import { fetcherPut } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';
import { trackSchema } from '@/lib/validation-schema/validation-schema.ts';

import type { Track, TrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type EditTrackPayload = { id: Track['id']; payload: TrackPayload };

const useEditTrack = () => {
  const { mutateAsync: editTrack } = useMutation<Track, Error, EditTrackPayload>({
    mutationFn: async ({ id, payload }: EditTrackPayload) => {
      const result = await fetcherPut<Track, TrackPayload>(`${URL}/${id}`, payload, {}, trackSchema);

      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
    },
    onSuccess: () => toast.success('Track is updated'),
    onError: (error) => toast.error(`Error! ${error.message || 'Something went wrong'}`),
  });

  return { editTrack };
};

export { useEditTrack };
