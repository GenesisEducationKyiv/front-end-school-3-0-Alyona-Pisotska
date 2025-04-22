import { useTrackContext } from '@/hooks/hooks.ts';
import { TrackToolbar, TracksTable, AppPagination } from '@/Components/components.ts';

const ContentContainer = () => {
  const { page, totalPages, handleChangePage } = useTrackContext();

  return (
    <div className='flex h-full flex-col gap-6 rounded-[4px] bg-white p-6'>
      <TrackToolbar />

      <div className='flex-grow'>
        <TracksTable />
      </div>

      <div className='self-end'>
        <AppPagination currentPage={page} totalPages={totalPages} onPageChange={handleChangePage} />
      </div>
    </div>
  );
};

export { ContentContainer };
