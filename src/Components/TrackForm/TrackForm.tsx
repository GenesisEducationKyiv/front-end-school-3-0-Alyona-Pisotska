import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from '@/Components/components.ts';
import {
  TrackTitleField,
  ArtistNameField,
  AlbumNameField,
  GenreSelectField,
  CoverImageField,
} from './components/components.ts';
import { trackMetadataSchema } from '@/lib/validation-schema/validation-schema.ts';

import type { TrackMetadataValues } from '@/lib/types/types.ts';

const TrackForm = () => {
  const form = useForm<TrackMetadataValues>({
    resolver: zodResolver(trackMetadataSchema),
    defaultValues: {
      title: '',
      artist: '',
      album: '',
      genre: [],
      coverImageUrl: '',
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
        <ArtistNameField control={control} />
        <AlbumNameField control={control} />
        <GenreSelectField control={control} />
        <CoverImageField control={control} />

        <Button type='submit'>Save</Button>
      </form>
    </Form>
  );
};

export { TrackForm };
