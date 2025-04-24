import { useSearchTextContext } from '@/hooks/hooks.ts';
import { SearchInput } from '@/Components/components.ts';

const GeneralSearch = () => {
  const { searchText, handleChangeSearchText } = useSearchTextContext();

  return <SearchInput searchText={searchText} onChangeSearchText={handleChangeSearchText} />;
};

export { GeneralSearch };
