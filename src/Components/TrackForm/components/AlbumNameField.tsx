import { Input, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/components.ts';

import { type Control } from 'react-hook-form';
import type { TrackMetadataValues } from '@/lib/types/types.ts';

type AlbumNameFieldProps = {
  control: Control<TrackMetadataValues>;
};

const AlbumNameField = ({ control }: AlbumNameFieldProps) => {
  return (
    <FormField
      data-testid='input-album'
      control={control}
      name='album'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Album name</FormLabel>
          <FormControl>
            <Input placeholder='Enter album name...' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { AlbumNameField };
