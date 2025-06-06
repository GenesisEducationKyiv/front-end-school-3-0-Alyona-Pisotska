import { flushSync } from 'react-dom';
import { useState } from '@/hooks/hooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  TrackAudioForm,
} from '@/Components/components';

import type { Track } from '@/lib/types/types';

type TrackInfoDialogProps = {
  triggerComponent: React.ReactNode;
  trackData: Track;
};

const TrackInfoDialog = ({ triggerComponent, trackData }: TrackInfoDialogProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
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
                setIsFormOpen(false);
              });
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { TrackInfoDialog };
