import { useGetTrackList } from '@/hooks/hooks';
import { Button, TrackFormDialogButton } from '@/Components/components';

const CreateTrackButton = () => {
  const { isLoadingTrackList } = useGetTrackList();

  return (
    <TrackFormDialogButton
      triggerComponent={
        <Button
          disabled={isLoadingTrackList}
          aria-disabled={isLoadingTrackList}
          data-loading={isLoadingTrackList ? 'true' : undefined}
          data-testid='create-track-button'
          onClick={() => {
            throw new Error('test error');
          }}
        >
          Create track
        </Button>
      }
      actionType={'add'}
    />
  );
};

export { CreateTrackButton };
