import { useSearchArtistQueryParam } from '@/hooks/hooks';
import { SearchInput } from '@/Components/components';
import { useTrackStore } from '@/stores/stores';

const ArtistSearch = () => {
  const { searchArtist, handleChangeSearchArtist } = useSearchArtistQueryParam();
  const isLoadingTracks = useTrackStore((state) => state.isLoadingTracks);

  return (
    <SearchInput
      searchText={searchArtist}
      onChangeSearchText={handleChangeSearchArtist}
      placeholder='Start typing artist name...'
      data-testid='filter-artist'
      aria-disabled={isLoadingTracks}
      data-loading={isLoadingTracks ? 'true' : undefined}
    />
  );
};

export { ArtistSearch };
