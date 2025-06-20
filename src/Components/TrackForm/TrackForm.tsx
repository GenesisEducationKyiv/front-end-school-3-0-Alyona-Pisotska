import { zodResolver } from '@hookform/resolvers/zod';
import { useTrackContext, useForm } from '@/hooks/hooks';
import { Button, Form } from '@/Components/components';
import {
  TrackTitleField,
  ArtistNameField,
  AlbumNameField,
  GenreSelectField,
  CoverImageField,
} from './components/components';
import { useDialogStore } from '@/stores/stores';
import { trackMetadataSchema } from '@/lib/validation-schema/validation-schema';

import type { TrackPayload, TrackMetadataValues, Track } from '@/lib/types/types';

type TrackFormProps = {
  initialValues: Track | undefined;
};

const TrackForm = ({ initialValues }: TrackFormProps) => {
  const { handleAddTrack, handleEditTrack } = useTrackContext();
  const setDialog = useDialogStore((state) => state.setDialog);

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

  const onSubmit = async (data: TrackMetadataValues) => {
    const trackData: TrackPayload = {
      title: data.title,
      artist: data.artist,
      album: data.album ?? '',
      genres: data.genres ?? [],
      coverImage: data.coverImage ?? '',
    };

    if (initialValues) {
      await handleEditTrack(initialValues.id, trackData);
    } else {
      await handleAddTrack(trackData);
    }

    setDialog(false);
  };

  const handleFormSubmit = handleSubmit((dto) => {
    void onSubmit(dto);
  });

  return (
    <Form {...form}>
      <form onSubmit={(e) => void handleFormSubmit(e)} className='space-y-4' data-testid='track-form'>
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
