import { useMutation } from '@/hooks/hooks.ts';
import { z } from 'zod';
import { toast } from 'sonner';
import { fetcherPost } from '@/lib/api/api.ts';
import { uploadedTrackSchema } from '@/lib/validation-schema/validation-schema.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

type TrackWithAudio = z.infer<typeof uploadedTrackSchema>;

const useUploadAudioTrack = (trackId: TrackWithAudio['id']) => {
  const { mutateAsync: uploadAudioTrack } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const result = await fetcherPost<TrackWithAudio>(
        `${API_ENDPOINTS.trackList}/${trackId}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        uploadedTrackSchema,
      );

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
