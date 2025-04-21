import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  TrackForm,
} from '@/Components/components.ts';

const CreateTrackButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create track</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Create a new track</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new track. All required fields must be completed before saving.
          </DialogDescription>
        </DialogHeader>

        <div className='p-4'>
          <TrackForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { CreateTrackButton };
