import { Button, TrackFormDialogButton } from '@/Components/components.ts';

const CreateTrackButton = () => {
  return <TrackFormDialogButton triggerComponent={<Button>Create track</Button>} actionType={'add'} />;
};

export { CreateTrackButton };
