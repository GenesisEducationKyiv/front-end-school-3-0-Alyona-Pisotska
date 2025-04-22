import { Control } from 'react-hook-form';
import { useEffect, useState, useWatch } from '@/hooks/hooks.ts';
import { FormItem, FormLabel, FormControl, FormMessage, FormField, Input } from '@/Components/components.ts';

import type { TrackMetadataValues } from '@/lib/types/types.ts';

type CoverImageFieldProps = {
  control: Control<TrackMetadataValues>;
};

const CoverImageField = ({ control }: CoverImageFieldProps) => {
  const [imageError, setImageError] = useState(false);
  const coverImageUrl = useWatch({ control, name: 'coverImage' });

  useEffect(() => {
    setImageError(false);
  }, [coverImageUrl]);

  return (
    <FormField
      control={control}
      name='coverImage'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cover image link</FormLabel>
          <FormControl>
            <Input placeholder='Enter cover image link...' {...field} />
          </FormControl>

          <div className='border-accent mt-2 h-[150px] overflow-hidden rounded border border-dashed'>
            <img
              src={field.value && !imageError ? field.value : '/no-image.png'}
              onError={() => setImageError(true)}
              alt='Cover Preview'
              className='h-full w-full rounded object-cover'
            />
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { CoverImageField };
