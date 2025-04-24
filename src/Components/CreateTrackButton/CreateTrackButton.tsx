import { Button, TrackFormDialogButton } from '@/Components/components.ts';
import { useTrackContext } from '@/hooks/hooks';

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
