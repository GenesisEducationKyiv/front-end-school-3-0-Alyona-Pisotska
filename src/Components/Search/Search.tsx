import { useSearchTextContext } from '@/hooks/hooks.ts';
import { Button, InputWithIcon } from '@/Components/components.ts';

import { Search as SearchIcon, X } from 'lucide-react';

const Search = () => {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  const hasValue = Boolean(searchText);

  return (
    <div className='relative w-full'>
      <InputWithIcon
        icon={SearchIcon}
        placeholder='Search by composition artist or album...'
        value={searchText}
        onChange={(e) => handleChangeSearchText(e.target.value)}
      />
      {hasValue && (
        <Button
          onClick={() => handleChangeSearchText('')}
          variant='ghost'
          className='text-muted-foreground hover:text-foreground absolute top-1/2 right-1 -translate-y-1/2'
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
};

export { Search };
