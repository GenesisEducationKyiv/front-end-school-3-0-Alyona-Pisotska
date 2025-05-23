import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@/hooks/hooks.ts';
import { fetcherDelete } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type DeleteTrackVariables = { id: Track['id'] };

const useDeleteTrack = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTrack } = useMutation<void, AxiosError, DeleteTrackVariables>({
    mutationFn: async ({ id }) => {
      await fetcherDelete(`${URL}/${id}`);
    },
    onSuccess: () => {
      toast.success('Track is deleted');
      queryClient.invalidateQueries({ queryKey: [URL] });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(`Error! ${axiosError.response?.data.error || 'Something went wrong'}`);
    },
  });

  return { deleteTrack };
};

export { useDeleteTrack };
