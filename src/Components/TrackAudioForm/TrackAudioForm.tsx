import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useUploadAudioTrack } from '@/hooks/hooks.ts';
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

  const form = useForm<AudioData>({
    resolver: zodResolver(audioSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: AudioData) => {
    const formData = {
      audioFile: data?.audioFile ?? '',
    };

    if (formData.audioFile) {
      uploadAudioTrack(formData.audioFile).then(() => onFormSubmission());
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <TrackAudioField control={control} initialAudioUrl={trackData?.audioFile} />

        <Button type='submit'>Save</Button>
      </form>
    </Form>
  );
};

export { TrackAudioForm };
