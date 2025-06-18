import { useTrackContext } from '@/hooks/hooks';
import { SearchInput } from '@/Components/components';

const ArtistSearch = () => {
  const { searchArtist, isLoadingTrackList, handleChangeSearchArtist } = useTrackContext();

  return (
    <SearchInput
      searchText={searchArtist}
      onChangeSearchText={handleChangeSearchArtist}
      placeholder='Start typing artist name...'
      data-testid='filter-artist'
      aria-disabled={isLoadingTrackList}
      data-loading={isLoadingTrackList ? 'true' : undefined}
    />
  );
};

export { ArtistSearch };
