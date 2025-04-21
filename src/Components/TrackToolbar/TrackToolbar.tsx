import { CreateTrackButton, Search } from '@/Components/components.ts';

const TrackToolbar = () => {
  return (
    <div className='flex gap-4'>
      <Search />
      <CreateTrackButton />
    </div>
  );
};

export { TrackToolbar };
