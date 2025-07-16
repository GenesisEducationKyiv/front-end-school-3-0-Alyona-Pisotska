import { ArtistSearch, GenreSelect } from '@/Components/components';

const AdvancedSearchSection = () => {
  return (
    <div className='bg-accent/10 border-accent rounded p-6 shadow'>
      <p>Advanced track search by genre and artist</p>

      <div className='mt-5 flex flex-col gap-4'>
        <ArtistSearch />
        <GenreSelect />
      </div>
    </div>
  );
};

export { AdvancedSearchSection };
