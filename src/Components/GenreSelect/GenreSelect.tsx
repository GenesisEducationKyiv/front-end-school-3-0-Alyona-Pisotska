import { useEffect, useGenreContext, useState, useTrackContext } from '@/hooks/hooks.ts';
import { SingleValue } from 'react-select';
import { Select } from '../components.ts';

import { SelectOption } from '@/lib/types/types.ts';

const GenreSelect = () => {
  const [selectedGenre, setSelectedGenre] = useState<SelectOption | null>(null);
  const { genreOptions, handleChangeSelectedGenre } = useGenreContext();
  const { isLoadingTrackList } = useTrackContext();

  const handleChangeSelectedValues = (newValue: SingleValue<SelectOption>) => {
    setSelectedGenre(newValue);
  };

  useEffect(() => {
    handleChangeSelectedGenre(selectedGenre?.value || '');
  }, [selectedGenre, handleChangeSelectedGenre]);

  return (
    <Select
      options={genreOptions}
      value={selectedGenre}
      onChange={handleChangeSelectedValues}
      isMulti={false}
      placeholder='Select composition genres...'
      data-testid='filter-genre'
      aria-disabled={isLoadingTrackList}
      data-loading={isLoadingTrackList ? 'true' : undefined}
    />
  );
};

export { GenreSelect };
