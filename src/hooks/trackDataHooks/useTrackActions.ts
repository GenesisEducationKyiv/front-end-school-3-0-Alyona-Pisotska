import { useCallback, useCreateTrack, useEditTrack, useDeleteTrack, useDeleteMultiTracks } from '@/hooks/hooks';
import { useTrackStore } from '@/stores/stores';

import type { Track, TrackPayload } from '@/lib/types/types';

const useTrackActions = () => {
  const getTrackById = useTrackStore((state) => state.getTrackById);
  const updateTrack = useTrackStore((state) => state.updateTrack);
  const resetTrack = useTrackStore((state) => state.resetTrack);

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
      const previousTrack = getTrackById(trackId);

      updateTrack(trackId, editTrackData);
      try {
        await editTrack({ id: trackId, payload: editTrackData });
      } catch {
        if (previousTrack) {
          resetTrack(trackId, previousTrack);
        }
      }
    },
    [editTrack, getTrackById, resetTrack, updateTrack],
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
