import { zodResolver } from '@hookform/resolvers/zod';
import { useTrackContext, useForm } from '@/hooks/hooks.ts';
import { Button, Form } from '@/Components/components.ts';
import {
  TrackTitleField,
  ArtistNameField,
  AlbumNameField,
  GenreSelectField,
  CoverImageField,
} from './components/components.ts';
import { trackMetadataSchema } from '@/lib/validation-schema/validation-schema.ts';

import type { TrackPayload, TrackMetadataValues, Track } from '@/lib/types/types.ts';

type TrackFormProps = {
  onFormSubmission: () => void;
  initialValues: Track | undefined;
};

const TrackForm = ({ onFormSubmission, initialValues }: TrackFormProps) => {
  const { handleAddTrack, handleEditTrack } = useTrackContext();

  const form = useForm<TrackMetadataValues>({
    resolver: zodResolver(trackMetadataSchema),
    defaultValues: {
      title: initialValues?.title ?? '',
      artist: initialValues?.artist ?? '',
      album: initialValues?.album ?? '',
      genres: initialValues?.genres ?? [],
      coverImage: initialValues?.coverImage ?? '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: TrackMetadataValues) => {
    const trackData: TrackPayload = {
      title: data.title,
      artist: data.artist,
      album: data.album ?? '',
      genres: data.genres ?? [],
      coverImage: data.coverImage ?? '',
    };

    if (initialValues) {
      handleEditTrack(initialValues.id, trackData).then(() => onFormSubmission());
    } else {
      handleAddTrack(trackData).then(() => onFormSubmission());
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' data-testid='track-form'>
        <TrackTitleField control={control} />
        <ArtistNameField control={control} />
        <AlbumNameField control={control} />
        <GenreSelectField control={control} />
        <CoverImageField control={control} />

        <Button type='submit' data-testid='submit-button'>
          Save
        </Button>
      </form>
    </Form>
  );
};

export { TrackForm };
