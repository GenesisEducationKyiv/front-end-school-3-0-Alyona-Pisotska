import { useDebounce, useEffect, useTrackContext, useState } from '@/hooks/hooks.ts';
import { SearchInput } from '@/Components/components.ts';

const ArtistSearch = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 250);
  const { handleChangeSearchArtist } = useTrackContext();

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
    />
  );
};

export { ArtistSearch };
