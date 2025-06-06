import { useAppMutation } from '@/hooks/hooks';
import { fetcherDelete } from '@/lib/api/api';
import { API_ENDPOINTS } from '@/lib/constants/constants';

import type { Track } from '@/lib/types/types';

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
