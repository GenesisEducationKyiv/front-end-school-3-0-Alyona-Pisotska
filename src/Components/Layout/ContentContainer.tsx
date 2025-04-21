import { TrackToolbar, TracksTable } from '@/Components/components.ts';

const ContentContainer = () => {
  return (
    <div className='flex h-full flex-col gap-6 rounded-[4px] bg-white p-6'>
      <TrackToolbar />
      <TracksTable />
    </div>
  );
};

export { ContentContainer };
