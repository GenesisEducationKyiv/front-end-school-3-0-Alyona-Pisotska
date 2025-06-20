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

const TrackInfoDialog = ({ triggerComponent, trackData }: TrackInfoDialogProps) => {
  const isDialogOpen = useDialogStore((state) => state.isDialogOpen);
  const setDialog = useDialogStore((state) => state.setDialog);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialog}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Track info</DialogTitle>
          <DialogDescription>
            Here you can upload a new audio file for the track or remove the current one.
          </DialogDescription>
        </DialogHeader>

        <div className='p-4'>
          <TrackAudioForm trackData={trackData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { TrackInfoDialog };
