import { Control } from 'react-hook-form';
import { Input, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/components.ts';

import type { TrackMetadataValues } from '@/lib/types/types.ts';

type ArtistNameFieldProps = {
  control: Control<TrackMetadataValues>;
};

const ArtistNameField = ({ control }: ArtistNameFieldProps) => {
  return (
    <FormField
      control={control}
      name='artist'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Artist name</FormLabel>
          <FormControl>
            <Input placeholder='Enter artist name' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { ArtistNameField };
