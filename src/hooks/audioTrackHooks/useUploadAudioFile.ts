import { useMutation } from '@/hooks/hooks.ts';
import { toast } from 'sonner';
import { fetcherPost } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const useUploadAudioTrack = (trackId: Track['id']) => {
  const { mutateAsync: uploadAudioTrack } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      return await fetcherPost(`${API_ENDPOINTS.trackList}/${trackId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => toast.success('Track audio is updated'),
    onError: (error) => toast.error(`Error. ${error.message}`),
  });

  return { uploadAudioTrack };
};

export { useUploadAudioTrack };
