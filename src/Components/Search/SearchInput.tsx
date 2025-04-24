import { Button, InputWithIcon } from '@/Components/components.ts';

import { Search as SearchIcon, X } from 'lucide-react';

type SearchInputProps = {
  searchText: string;
  onChangeSearchText: (value: string) => void;
  placeholder?: string;
};

const SearchInput = ({
  searchText,
  onChangeSearchText,
  placeholder = 'Search by composition, artist or album...',
}: SearchInputProps) => {
  const hasValue = Boolean(searchText);

  return (
    <div className='relative w-full'>
      <InputWithIcon
        icon={SearchIcon}
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => onChangeSearchText(e.target.value)}
      />
      {hasValue && (
        <Button
          onClick={() => onChangeSearchText('')}
          variant='ghost'
          className='text-muted-foreground hover:text-foreground absolute top-1/2 right-1 -translate-y-1/2'
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
};

export { SearchInput };
