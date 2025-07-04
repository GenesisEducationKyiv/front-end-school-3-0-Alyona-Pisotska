import { useEffect, useState, useWatch } from '@/hooks/hooks';
import { FormItem, FormLabel, FormControl, FormMessage, FormField, Input } from '@/Components/components';
import { cn } from '@/lib/utils/utils';

import type { Control } from 'react-hook-form';
import type { TrackMetadataValues } from '@/lib/types/types';

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
      data-testid='input-cover-image'
      control={control}
      name='coverImage'
      render={({ field }) => {
        const hasImage = Boolean(field.value && !imageError);

        return (
          <FormItem>
            <FormLabel>Cover image link</FormLabel>
            <FormControl>
              <Input placeholder='Enter cover image link...' {...field} />
            </FormControl>

            <div className='border-accent mt-2 h-[150px] overflow-hidden rounded border border-dashed'>
              <img
                src={hasImage ? field.value : '/no-image.svg'}
                onError={() => setImageError(true)}
                alt='Cover Preview'
                className={cn('h-full w-full rounded object-cover', hasImage ? 'object-cover' : 'object-contain')}
              />
            </div>

            <FormMessage data-testid='error-cover-image' />
          </FormItem>
        );
      }}
    />
  );
};

export { CoverImageField };
