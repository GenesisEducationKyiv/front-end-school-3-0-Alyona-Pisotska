import { useCallback, useCreateTrack, useEditTrack, useDeleteTrack, useDeleteMultiTracks } from '@/hooks/hooks';

import type { Track, TrackPayload } from '@/lib/types/types';

const useTrackActions = () => {
  const { createNewTrack } = useCreateTrack();
  const { editTrack } = useEditTrack();
  const { deleteTrack } = useDeleteTrack();
  const { deleteMultiTracks } = useDeleteMultiTracks();

  const handleAddTrack = useCallback(
    async (newTrack: TrackPayload) => {
      await createNewTrack(newTrack);
    },
    [createNewTrack],
  );

  const handleEditTrack = useCallback(
    async (trackId: Track['id'], editTrackData: TrackPayload) => {
      await editTrack({ id: trackId, payload: editTrackData });
    },
    [editTrack],
  );

  const handleDeleteTrack = useCallback(
    async (trackId: Track['id']) => {
      await deleteTrack({ id: trackId });
    },
    [deleteTrack],
  );

  const handleDeleteMultiTracks = useCallback(
    async (trackIds: Track['id'][]) => {
      await deleteMultiTracks({ ids: trackIds });
    },
    [deleteMultiTracks],
  );

  return {
    handleAddTrack,
    handleEditTrack,
    handleDeleteTrack,
    handleDeleteMultiTracks,
  };
};

export { useTrackActions };
