import { Input, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/components.ts';

import type { Control } from 'react-hook-form';
import type { TrackMetadataValues } from '@/lib/types/types.ts';

type TrackTitleFieldProps = {
  control: Control<TrackMetadataValues>;
};

const TrackTitleField = ({ control }: TrackTitleFieldProps) => {
  return (
    <FormField
      data-testid='input-title'
      control={control}
      name='title'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='gap-0'>
            Composition <span className='text-red-500'>*</span>
          </FormLabel>
          <FormControl>
            <Input placeholder='Enter composition name...' {...field} />
          </FormControl>
          <FormMessage data-testid='error-title' />
        </FormItem>
      )}
    />
  );
};

export { TrackTitleField };
