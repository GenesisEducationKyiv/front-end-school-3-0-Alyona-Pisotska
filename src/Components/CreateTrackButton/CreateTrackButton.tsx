import {
  Button,
  Dialog,
  DialogContent,
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
        </DialogHeader>

        <div className='p-4'>
          <TrackForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { CreateTrackButton };
