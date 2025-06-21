import { useSearchQueryParam, useTrackContext } from '@/hooks/hooks';
import { SearchInput } from '@/Components/components';

const GeneralSearch = () => {
  const { searchText, handleChangeSearchText } = useSearchQueryParam();
  const { isLoadingTrackList } = useTrackContext();

  return (
    <SearchInput
      searchText={searchText}
      onChangeSearchText={handleChangeSearchText}
      data-testid='search-input'
      aria-disabled={isLoadingTrackList}
      data-loading={isLoadingTrackList ? 'true' : undefined}
    />
  );
};

export { GeneralSearch };
