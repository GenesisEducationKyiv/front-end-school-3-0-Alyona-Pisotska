import { useGenreContext, useTrackContext } from '@/hooks/hooks';
import { O, pipe } from '@mobily/ts-belt';
import { Select } from '@/Components/components';

import type { SingleValue } from 'react-select';
import type { SelectOption } from '@/lib/types/types';

const GenreSelect = () => {
  const { selectedGenre, genreOptions, handleChangeSelectedGenre } = useGenreContext();
  const { isLoadingTrackList } = useTrackContext();

  const selectedGenreOption: SelectOption | null = pipe(
    O.fromNullable(selectedGenre),
    O.map((genre) => ({ value: genre, label: genre })),
    O.toNullable,
  );

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
