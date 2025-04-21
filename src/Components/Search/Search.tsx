import { useSearchTextContext } from '@/hooks/hooks.ts';
import { Input } from '@/Components/components.ts';

const Search = () => {
  const { searchText, handleChangeSearchText } = useSearchTextContext();

  return (
    <Input
      value={searchText}
      onChange={(e) => {
        handleChangeSearchText(e.target.value);
      }}
    />
  );
};

export { Search };
