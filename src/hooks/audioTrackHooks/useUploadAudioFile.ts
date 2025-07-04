import { useAppMutation } from '@/hooks/hooks';
import { fetcherPost } from '@/lib/api/api';
import { uploadedTrackSchema } from '@/lib/validation-schema/validation-schema';
import { API_ENDPOINTS } from '@/lib/constants/constants';

import type { z } from 'zod';

type TrackWithAudio = z.infer<typeof uploadedTrackSchema>;

const useUploadAudioTrack = (trackId: TrackWithAudio['id']) => {
  const { mutateAsync: uploadAudioTrack } = useAppMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      return fetcherPost<TrackWithAudio>(
        `${API_ENDPOINTS.trackList}/${trackId}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        uploadedTrackSchema,
      );
    },
    successMessage: 'Track audio is uploaded',
    invalidateQueryKey: [API_ENDPOINTS.trackList],
  });

  return { uploadAudioTrack };
};

export { useUploadAudioTrack };
