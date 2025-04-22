import { useMutation } from '@/hooks/hooks.ts';
import { fetcherPost } from '@/lib/utils/utils.ts';
import { API_ENDPOINTS } from '@/lib/constants/constants.ts';

import type { NewTrackPayload } from '@/lib/types/types.ts';

const URL = API_ENDPOINTS.trackList;

type NewTrack = NewTrackPayload;

const useCreateTrack = () => {
  const { mutateAsync: createNewTrack } = useMutation<NewTrack, Error, NewTrackPayload>({
    mutationFn: ({ title, artist, album, genres, coverImage }) => {
      return fetcherPost<NewTrack, NewTrackPayload>(URL, {
        title,
        artist,
        album,
        genres,
        coverImage,
      });
    },
  });

  return { createNewTrack };
};
export { useCreateTrack };
