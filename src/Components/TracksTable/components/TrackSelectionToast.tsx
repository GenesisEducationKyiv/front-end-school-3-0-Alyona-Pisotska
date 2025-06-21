import { useEffect, useCallback, useTrackActions } from '@/hooks/hooks';
import { toast } from 'sonner';
import { useTrackStore } from '@/stores/stores';

const SELECTED_TOAST_ID = 'selected-toast';

const TrackSelectionToast = () => {
  const selectedTrackIds = useTrackStore((state) => state.selectedTrackIds);
  const clearSelectedIds = useTrackStore((state) => state.clearSelectedIds);

  const { handleDeleteMultiTracks } = useTrackActions();

  const onDeleteTracksClick = useCallback(async () => {
    await handleDeleteMultiTracks(selectedTrackIds).then(() => {
      clearSelectedIds();
    });
  }, [clearSelectedIds, handleDeleteMultiTracks, selectedTrackIds]);

  useEffect(() => {
    if (selectedTrackIds.length === 0) {
      toast.dismiss(SELECTED_TOAST_ID);
      return;
    }

    toast.info(`Delete ${selectedTrackIds.length} track(s)`, {
      id: SELECTED_TOAST_ID,
      duration: Infinity,
      action: {
        label: 'Delete track',
        onClick: () => void onDeleteTracksClick(),
      },
    });
  }, [selectedTrackIds, onDeleteTracksClick]);

  return null;
};

export { TrackSelectionToast };
