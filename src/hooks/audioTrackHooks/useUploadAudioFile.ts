import { useMutation } from '@/hooks/hooks.ts';
import { toast } from 'sonner';
import { fetcherPost } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const useUploadAudioTrack = (trackId: Track['id']) => {
  const { mutateAsync: uploadAudioTrack } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const result = await fetcherPost<Track>(`${API_ENDPOINTS.trackList}/${trackId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (result.isErr()) {
        throw result.error;
      }

      return result.value;
    },
    onSuccess: () => toast.success('Track audio is updated'),
    onError: (error) => toast.error(`Error! ${error.message}`),
  });

  return { uploadAudioTrack };
};

export { useUploadAudioTrack };
