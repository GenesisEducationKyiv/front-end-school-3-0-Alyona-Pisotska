import { useMutation } from '@/hooks/hooks.ts';
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
    onError: (error) => toast.error(`Error! ${error.message || 'Something went wrong'}`),
  });

  return { deleteAudioFile };
};

export { useDeleteAudioFile };
