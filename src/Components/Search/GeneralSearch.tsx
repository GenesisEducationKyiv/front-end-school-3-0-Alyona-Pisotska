import { useSearchQueryParam } from '@/hooks/hooks';
import { SearchInput } from '@/Components/components';
import { useTrackStore } from '@/stores/stores';

const GeneralSearch = () => {
  const { searchText, handleChangeSearchText } = useSearchQueryParam();
  const isLoadingTracks = useTrackStore((state) => state.isLoadingTracks);

  return (
    <SearchInput
      searchText={searchText}
      onChangeSearchText={handleChangeSearchText}
      data-testid='search-input'
      aria-disabled={isLoadingTracks}
      data-loading={isLoadingTracks ? 'true' : undefined}
    />
  );
};

export { GeneralSearch };
