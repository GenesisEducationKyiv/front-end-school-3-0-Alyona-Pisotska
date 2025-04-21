import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Form } from '@/Components/components.ts';
import { TrackTitleField } from './components/components.ts';
import { trackMetadataSchema } from '@/lib/validation-schema/validation-schema.ts';

type TrackMetadataValues = z.infer<typeof trackMetadataSchema>;

const TrackForm = () => {
  const form = useForm<TrackMetadataValues>({
    resolver: zodResolver(trackMetadataSchema),
    defaultValues: {
      title: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data: TrackMetadataValues) => {
    console.log('data:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <TrackTitleField control={control} />

        <Button type='submit'>Save</Button>
      </form>
    </Form>
  );
};

export { TrackForm };
