import { Control } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage, FormField, Input } from '@/Components/components.ts';

import type { TrackMetadataValues } from '@/lib/types/types.ts';

type CoverImageFieldProps = {
  control: Control<TrackMetadataValues>;
};

const CoverImageField = ({ control }: CoverImageFieldProps) => {
  return (
    <FormField
      control={control}
      name='coverImageUrl'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cover image link</FormLabel>
          <FormControl>
            <Input placeholder='Enter cover image link...' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { CoverImageField };
