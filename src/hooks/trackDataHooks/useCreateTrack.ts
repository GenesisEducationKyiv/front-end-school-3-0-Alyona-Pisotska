import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { fetcherPost } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { TrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type NewTrack = TrackPayload;

const useCreateTrack = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createNewTrack } = useMutation<NewTrack, Error, TrackPayload>({
    mutationFn: (payload) => {
      return fetcherPost<NewTrack, TrackPayload>(URL, payload);
    },
    onSuccess: () => {
      toast.success('Track is created');
      queryClient.invalidateQueries({ queryKey: [URL] });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(`Error! ${axiosError.response?.data.error || 'Something went wrong'}`);
    },
  });

  return { createNewTrack };
};

export { useCreateTrack };
