import { useAppMutation } from '@/hooks/hooks.ts';
import { fetcherDelete } from '@/lib/api/api.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type DeleteTrackPayload = { id: Track['id'] };

const useDeleteTrack = () => {
  const { mutateAsync: deleteTrack } = useAppMutation({
    mutationFn: ({ id }: DeleteTrackPayload) => {
      return fetcherDelete<void>(`${URL}/${id}`);
    },
    successMessage: 'Track is deleted',
    invalidateQueryKey: [URL],
  });

  return { deleteTrack };
};

export { useDeleteTrack };
