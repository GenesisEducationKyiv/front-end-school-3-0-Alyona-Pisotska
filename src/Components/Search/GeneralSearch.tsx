import { useGetTrackList, useSearchQueryParam } from '@/hooks/hooks';
import { SearchInput } from '@/Components/components';

const GeneralSearch = () => {
  const { searchText, handleChangeSearchText } = useSearchQueryParam();
  const { isLoadingTrackList } = useGetTrackList();

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
