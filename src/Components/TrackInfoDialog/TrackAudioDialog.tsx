import { flushSync } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  TrackAudioForm,
} from '@/Components/components';
import { useDialogStore } from '@/stores/stores';

import type { Track } from '@/lib/types/types';

type TrackInfoDialogProps = {
  triggerComponent: React.ReactNode;
  trackData: Track;
};

const TrackAudioDialog = ({ triggerComponent, trackData }: TrackInfoDialogProps) => {
  const isDialogOpen = useDialogStore((state) => state.isOpen('track-audio-dialog'));
  const setDialog = useDialogStore((state) => state.setDialog);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(value) => setDialog('track-audio-dialog', value)}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Track info</DialogTitle>
          <DialogDescription>
            Here you can upload a new audio file for the track or remove the current one.
          </DialogDescription>
        </DialogHeader>

        <div className='p-4'>
          <TrackAudioForm
            trackData={trackData}
            onFormSubmission={() => {
              flushSync(() => {
                setDialog('track-audio-dialog', false);
              });
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { TrackAudioDialog };
