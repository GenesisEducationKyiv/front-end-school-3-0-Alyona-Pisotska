import { CreateTrackButton, GeneralSearch } from '@/Components/components.ts';

const TrackToolbar = () => {
  return (
    <div className='flex gap-4'>
      <GeneralSearch />
      <CreateTrackButton />
    </div>
  );
};

export { TrackToolbar };
