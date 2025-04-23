import { useMutation } from '@/hooks/hooks.ts';
import { toast } from 'sonner';
import { fetcherPost } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

const useUploadAudioTrack = (trackId: string) => {
  const mutation = useMutation({
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

  return {
    uploadAudioTrack: mutation.mutateAsync,
  };
};

export { useUploadAudioTrack };
