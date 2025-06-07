import { useGenreContext, useTrackContext } from '@/hooks/hooks';
import { Select } from '@/Components/components';

import type { SingleValue } from 'react-select';
import type { SelectOption } from '@/lib/types/types';

const GenreSelect = () => {
  const { selectedGenre, genreOptions, handleChangeSelectedGenre } = useGenreContext();
  const { isLoadingTrackList } = useTrackContext();

  const selectedGenreOption: SelectOption | null = selectedGenre
    ? { value: selectedGenre, label: selectedGenre }
    : null;

  const handleChangeSelectedValues = (newValue: SingleValue<SelectOption>) => {
    handleChangeSelectedGenre(newValue?.value ?? '');
  };

  return (
    <Select
      options={genreOptions}
      value={selectedGenreOption}
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
