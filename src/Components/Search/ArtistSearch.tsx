import { useDebounce, useEffect, useTrackContext, useState } from '@/hooks/hooks';
import { SearchInput } from '@/Components/components';

const ArtistSearch = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 250);
  const { isLoadingTrackList, handleChangeSearchArtist } = useTrackContext();

  useEffect(() => {
    handleChangeSearchArtist(debouncedSearchText);
  }, [debouncedSearchText, handleChangeSearchArtist]);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchInput
      searchText={searchText}
      onChangeSearchText={handleChangeSearchText}
      placeholder='Start typing artist name...'
      data-testid='filter-artist'
      aria-disabled={isLoadingTrackList}
      data-loading={isLoadingTrackList ? 'true' : undefined}
    />
  );
};

export { ArtistSearch };
