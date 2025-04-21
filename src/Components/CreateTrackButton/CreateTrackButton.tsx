import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/components.ts';

const CreateTrackButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create track</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create a new track</DialogTitle>
        </DialogHeader>
        Form here...
      </DialogContent>
    </Dialog>
  );
};

export { CreateTrackButton };
