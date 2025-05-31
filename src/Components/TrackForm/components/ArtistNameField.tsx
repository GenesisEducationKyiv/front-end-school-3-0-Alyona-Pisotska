import { Input, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/components.ts';

import type { Control } from 'react-hook-form';
import type { TrackMetadataValues } from '@/lib/types/types.ts';

type ArtistNameFieldProps = {
  control: Control<TrackMetadataValues>;
};

const ArtistNameField = ({ control }: ArtistNameFieldProps) => {
  return (
    <FormField
      data-testid='input-artist'
      control={control}
      name='artist'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='gap-0'>
            Artist name <span className='text-red-500'>*</span>
          </FormLabel>
          <FormControl>
            <Input placeholder='Enter artist name...' {...field} />
          </FormControl>
          <FormMessage data-testid='error-artist' />
        </FormItem>
      )}
    />
  );
};

export { ArtistNameField };
