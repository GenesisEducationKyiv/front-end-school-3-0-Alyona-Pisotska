import { toast } from 'sonner';
import { useMutation } from '@/hooks/hooks.ts';
import { fetcherPut } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track, TrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

const useEditTrack = () => {
  const { mutateAsync: editTrack } = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: TrackPayload }) => {
      const result = await fetcherPut<Track, TrackPayload>(`${URL}/${id}`, payload);

      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
    },
    onSuccess: () => {
      toast.success('Track is updated');
    },
    onError: (error) => {
      toast.error(`Error! ${error.message}`);
    },
  });

  return { editTrack };
};

export { useEditTrack };
