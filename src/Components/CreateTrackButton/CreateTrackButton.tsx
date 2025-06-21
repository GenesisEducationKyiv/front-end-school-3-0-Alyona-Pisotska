import { Button, TrackFormDialogButton } from '@/Components/components';
import { useTrackStore } from '@/stores/stores';

const CreateTrackButton = () => {
  const isLoadingTracks = useTrackStore((state) => state.isLoadingTracks);

  return (
    <TrackFormDialogButton
      triggerComponent={
        <Button
          disabled={isLoadingTracks}
          aria-disabled={isLoadingTracks}
          data-loading={isLoadingTracks ? 'true' : undefined}
          data-testid='create-track-button'
        >
          Create track
        </Button>
      }
      actionType={'add'}
    />
  );
};

export { CreateTrackButton };
