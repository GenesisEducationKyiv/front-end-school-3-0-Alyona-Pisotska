import { useTrackContext } from '@/hooks/hooks';
import { TrackToolbar, TracksTable, AppPagination, AdvancedSearchSection, PageTitle } from '@/Components/components';

const ContentContainer = () => {
  const { page, totalPages, handleChangePage } = useTrackContext();

  return (
    <div className='h-full flex-grow rounded-[4px] bg-white p-6 shadow-2xl'>
      <PageTitle />

      <section className='flex flex-col gap-6'>
        <TrackToolbar />
        <AdvancedSearchSection />
        <div className='flex-grow'>
          <TracksTable />
        </div>
        <div className='self-end'>
          <AppPagination currentPage={page} totalPages={totalPages} onPageChange={handleChangePage} />
        </div>
      </section>
    </div>
  );
};

export { ContentContainer };
