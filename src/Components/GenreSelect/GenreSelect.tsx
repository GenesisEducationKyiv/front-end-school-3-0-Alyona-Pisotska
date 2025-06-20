import { useTrackContext, useGenreData, useQueryParams } from '@/hooks/hooks';
import { O, pipe } from '@mobily/ts-belt';
import { Select } from '@/Components/components';
import { setParamWithResetPage } from '@/lib/utils/utils';
import { QUERY_PARAM_KEYS } from '@/lib/constants/constants';

import type { SingleValue } from 'react-select';
import type { SelectOption } from '@/lib/types/types';

const GenreSelect = () => {
  const { genreOptions, selectedGenre } = useGenreData();
  const { isLoadingTrackList } = useTrackContext();

  const { setMany } = useQueryParams();

  const selectedGenreOption: SelectOption | null = pipe(
    O.fromNullable(selectedGenre),
    O.map((genre) => ({ value: genre, label: genre })),
    O.toNullable,
  );

  const handleChangeSelectedValues = (newValue: SingleValue<SelectOption>) => {
    const selectedGenre = newValue?.value || '';

    setParamWithResetPage(QUERY_PARAM_KEYS.genre, selectedGenre, setMany);
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
