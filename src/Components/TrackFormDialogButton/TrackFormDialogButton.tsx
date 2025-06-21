import { flushSync } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  TrackForm,
} from '@/Components/components';
import { useDialogStore } from '@/stores/stores';

import type { DialogIds, Track } from '@/lib/types/types';

type TrackFormDialogButtonProps = {
  triggerComponent: React.ReactNode;
  actionType: 'add' | 'edit';
  initialTrackData?: Track;
};

const TrackFormDialogButton = ({ triggerComponent, actionType, initialTrackData }: TrackFormDialogButtonProps) => {
  const dialogId: DialogIds = actionType === 'add' ? 'create-track-dialog' : 'edit-track-dialog';

  const isDialogOpen = useDialogStore((state) => state.isOpen(dialogId));
  const setDialog = useDialogStore((state) => state.setDialog);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(value) => setDialog(dialogId, value)}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{actionType === 'add' ? 'Create a new track' : 'Edit a track'}</DialogTitle>
          <DialogDescription>
            Fill in the details below to {actionType} a new track. All required fields must be completed before saving.
          </DialogDescription>
        </DialogHeader>

        <div className='p-4'>
          <TrackForm
            initialValues={initialTrackData}
            onFormSubmission={() => {
              flushSync(() => {
                const dialogId: DialogIds = initialTrackData ? 'edit-track-dialog' : 'create-track-dialog';

                setDialog(dialogId, false);
              });
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { TrackFormDialogButton };
