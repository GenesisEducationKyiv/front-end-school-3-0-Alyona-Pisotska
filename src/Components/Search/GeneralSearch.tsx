import { useSearchTextContext, useTrackContext } from '@/hooks/hooks.ts';
import { SearchInput } from '@/Components/components.ts';

const GeneralSearch = () => {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
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
