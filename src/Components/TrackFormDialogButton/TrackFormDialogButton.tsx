import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  TrackForm,
} from '@/Components/components';
import { useModalStore } from '@/stores/stores';

import type { Track } from '@/lib/types/types';

type TrackFormDialogButtonProps = {
  triggerComponent: React.ReactNode;
  actionType: 'add' | 'edit';
  initialTrackData?: Track;
};

const TrackFormDialogButton = ({ triggerComponent, actionType, initialTrackData }: TrackFormDialogButtonProps) => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <Dialog open={isModalOpen} onOpenChange={openModal}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{actionType === 'add' ? 'Create a new track' : 'Edit a track'}</DialogTitle>
          <DialogDescription>
            Fill in the details below to {actionType} a new track. All required fields must be completed before saving.
          </DialogDescription>
        </DialogHeader>

        <div className='p-4'>
          <TrackForm initialValues={initialTrackData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { TrackFormDialogButton };
