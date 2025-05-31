import { useMutation } from '@/hooks/hooks.ts';
import { toast } from 'sonner';
import { fetcherPost } from '@/lib/api/api.ts';
import { uploadedTrackSchema } from '@/lib/validation-schema/validation-schema.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { z } from 'zod';

type TrackWithAudio = z.infer<typeof uploadedTrackSchema>;

const useUploadAudioTrack = (trackId: TrackWithAudio['id']) => {
  const { mutateAsync: uploadAudioTrack } = useMutation<TrackWithAudio, Error, File>({
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
    onError: (error) => toast.error(`Error! ${error.message || 'Something went wrong'}`),
  });

  return { uploadAudioTrack };
};

export { useUploadAudioTrack };
