import { Input, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/components';

import { type Control } from 'react-hook-form';
import type { TrackMetadataValues } from '@/lib/types/types';

type AlbumNameFieldProps = {
  control: Control<TrackMetadataValues>;
};

const AlbumNameField = ({ control }: AlbumNameFieldProps) => {
  return (
    <FormField
      control={control}
      name='album'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Album name</FormLabel>
          <FormControl>
            <Input placeholder='Enter album name...' data-testid='input-album' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { AlbumNameField };
