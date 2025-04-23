import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useUploadAudioTrack, useDeleteAudioFile } from '@/hooks/hooks.ts';
import { Button, Form } from '@/Components/components.ts';
import { TrackAudioField } from './components/components.ts';
import { audioSchema } from '@/lib/validation-schema/validation-schema.ts';

import type { AudioData, Track } from '@/lib/types/types.ts';

type TrackFormProps = {
  onFormSubmission: () => void;
  trackData: Track;
};

const TrackAudioForm = ({ onFormSubmission, trackData }: TrackFormProps) => {
  const { uploadAudioTrack } = useUploadAudioTrack(trackData.id);
  const { deleteAudioFile } = useDeleteAudioFile(trackData.id);

  const form = useForm<AudioData>({
    resolver: zodResolver(audioSchema),
  });

  const { handleSubmit, control, watch } = form;
  const watchedFile = watch('audioFile');

  const isModified =
    (trackData.audioFile && watchedFile === '') ||
    (!trackData.audioFile && watchedFile instanceof File) ||
    (trackData.audioFile && watchedFile instanceof File) ||
    false;

  const onSubmit = (data: AudioData) => {
    const formData = {
      audioFile: data?.audioFile ?? '',
    };

    if (formData.audioFile) {
      uploadAudioTrack(formData.audioFile).then(() => onFormSubmission());
    } else {
      deleteAudioFile().then(() => onFormSubmission());
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <TrackAudioField control={control} initialAudioUrl={trackData?.audioFile} />

        <Button type='submit' disabled={!isModified}>
          Save
        </Button>
      </form>
    </Form>
  );
};

export { TrackAudioForm };
