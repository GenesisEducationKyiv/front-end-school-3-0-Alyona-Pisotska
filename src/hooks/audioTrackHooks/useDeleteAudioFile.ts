import { useAppMutation } from '@/hooks/hooks.ts';
import { fetcherDelete } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const useDeleteAudioFile = (trackId: Track['id']) => {
  const { mutateAsync: deleteAudioFile } = useAppMutation({
    mutationFn: () => {
      return fetcherDelete<void>(`${API_ENDPOINTS.trackList}/${trackId}/file`);
    },
    successMessage: 'Track audio is deleted',
  });

  return { deleteAudioFile };
};

export { useDeleteAudioFile };
