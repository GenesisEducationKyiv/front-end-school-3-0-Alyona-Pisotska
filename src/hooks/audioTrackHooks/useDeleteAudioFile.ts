import { useMutation } from '@/hooks/hooks.ts';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { fetcherDelete } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const useDeleteAudioFile = (trackId: Track['id']) => {
  const { mutateAsync: deleteAudioFile } = useMutation({
    mutationFn: async () => {
      await fetcherDelete(`${API_ENDPOINTS.trackList}/${trackId}/file`);
    },
    onSuccess: () => toast.success('Track audio is deleted'),
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(`Error! ${axiosError.response?.data.error || 'Something went wrong'}`);
    },
  });

  return { deleteAudioFile };
};

export { useDeleteAudioFile };
