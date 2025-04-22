import { useMutation } from '@/hooks/hooks.ts';
import { fetcherPut } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track, TrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

const useEditTrack = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TrackPayload }) =>
      fetcherPut<Track, TrackPayload>(`${URL}/${id}`, payload),
  });

  return {
    editTrack: mutation.mutateAsync,
  };
};

export { useEditTrack };
