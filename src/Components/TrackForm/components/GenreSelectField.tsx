import { Control } from 'react-hook-form';
import { useGenreContext, useMemo } from '@/hooks/hooks.ts';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Select } from '@/Components/components.ts';

import type { TrackMetadataValues } from '@/lib/types/types.ts';

type TrackTitleFieldProps = {
  control: Control<TrackMetadataValues>;
};

const GenreSelectField = ({ control }: TrackTitleFieldProps) => {
  const { genreList } = useGenreContext();

  const options = useMemo(() => {
    return genreList.map((item) => ({ value: item, label: item }));
  }, [genreList]);

  return (
    <FormField
      control={control}
      name='genre'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='gap-0'>Genres</FormLabel>
          <FormControl>
            <Select
              options={options}
              value={options.filter((opt) => field.value?.includes(opt.value))}
              onChange={(newValue) => field.onChange(newValue.map((opt) => opt.value))}
              isMulti={true}
              placeholder='Select composition genres...'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { GenreSelectField };
