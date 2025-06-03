import { useAppMutation } from '@/hooks/hooks.ts';
import { fetcherPost } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type DeleteTracksPayload = {
  ids: Track['id'][];
};

const useDeleteMultiTracks = () => {
  const { mutateAsync: deleteMultiTracks } = useAppMutation({
    mutationFn: (payload: DeleteTracksPayload) => {
      return fetcherPost<void, DeleteTracksPayload>(`${URL}/delete`, payload);
    },
    successMessage: 'Tracks are deleted',
    invalidateQueryKey: [URL],
  });

  return { deleteMultiTracks };
};

export { useDeleteMultiTracks };
