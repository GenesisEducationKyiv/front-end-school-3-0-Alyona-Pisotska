import { useMutation } from '@/hooks/hooks.ts';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { fetcherDelete } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const useDeleteAudioFile = (trackId: Track['id']) => {
  const { mutateAsync: deleteAudioFile } = useMutation({
    mutationFn: async () => {
      const result = await fetcherDelete<void>(`${API_ENDPOINTS.trackList}/${trackId}/file`);

      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
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
