import { useTrackContext } from '@/hooks/hooks';
import { Button, TrackFormDialogButton } from '@/Components/components';

const CreateTrackButton = () => {
  const { isLoadingTrackList } = useTrackContext();

  return (
    <TrackFormDialogButton
      triggerComponent={
        <Button
          disabled={isLoadingTrackList}
          aria-disabled={isLoadingTrackList}
          data-loading={isLoadingTrackList ? 'true' : undefined}
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
