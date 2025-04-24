import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { fetcherPost } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type DeleteTracksPayload = {
  ids: Track['id'][];
};

export const useDeleteMultiTracks = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteMultiTracks } = useMutation<void, AxiosError, DeleteTracksPayload>({
    mutationFn: async ({ ids }) => {
      await fetcherPost<void, DeleteTracksPayload>(`${URL}/delete`, { ids });
    },
    onSuccess: () => {
      toast.success('Tracks are deleted');
      queryClient.invalidateQueries({ queryKey: [URL] });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(`Error! ${axiosError.response?.data.error || 'Something went wrong'}`);
    },
  });

  return { deleteMultiTracks };
};
