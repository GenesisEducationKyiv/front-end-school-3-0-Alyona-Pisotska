import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useMutation } from '@/hooks/hooks.ts';
import { fetcherPut } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track, TrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

const useEditTrack = () => {
  const { mutateAsync: editTrack } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TrackPayload }) =>
      fetcherPut<Track, TrackPayload>(`${URL}/${id}`, payload),
    onSuccess: () => {
      toast.success('Track is updated');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(`Error! ${axiosError.response?.data.error || 'Something went wrong'}`);
    },
  });

  return { editTrack };
};

export { useEditTrack };
