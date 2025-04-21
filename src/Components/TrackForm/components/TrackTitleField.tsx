import * as z from 'zod';
import { Control } from 'react-hook-form';
import { Input, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/components.ts';
import { trackMetadataSchema } from '@/lib/validation-schema/validation-schema.ts';

type TrackMetadataValues = z.infer<typeof trackMetadataSchema>;
type TrackTitleFieldProps = {
  control: Control<TrackMetadataValues>;
};

const TrackTitleField = ({ control }: TrackTitleFieldProps) => {
  return (
    <FormField
      control={control}
      name='title'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Track title</FormLabel>
          <FormControl>
            <Input placeholder='Enter composition name' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { TrackTitleField };
