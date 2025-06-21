import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useForm, useUploadAudioTrack, useDeleteAudioFile } from '@/hooks/hooks';
import { Button, Form } from '@/Components/components';
import { TrackAudioField } from './components/components';
import { useDialogStore, useTrackStore } from '@/stores/stores';
import { audioSchema } from '@/lib/validation-schema/validation-schema';

import type { AudioData, Track } from '@/lib/types/types';

type TrackFormProps = {
  trackData: Track;
};

const TrackAudioForm = ({ trackData }: TrackFormProps) => {
  const { uploadAudioTrack } = useUploadAudioTrack(trackData.id);
  const { deleteAudioFile } = useDeleteAudioFile(trackData.id);

  const addTrackAudio = useTrackStore((state) => state.addAudioFile);
  const deleteTrackAudio = useTrackStore((state) => state.deleteAudioFile);

  const setDialog = useDialogStore((state) => state.setDialog);

  const form = useForm<AudioData>({
    resolver: zodResolver(audioSchema),
  });

  const { handleSubmit, control, watch } = form;
  const watchedFile = watch('audioFile');

  const isModified =
    (trackData.audioFile && watchedFile === null) ||
    (!trackData.audioFile && watchedFile instanceof File) ||
    (trackData.audioFile && watchedFile instanceof File) ||
    false;

  const onSubmit = async (data: AudioData) => {
    try {
      const audioFile = data.audioFile ?? null;

      if (audioFile) {
        const uploaded = await uploadAudioTrack(audioFile);
        addTrackAudio(trackData.id, uploaded.audioFile);
      } else {
        await deleteAudioFile();
        deleteTrackAudio(trackData.id);
      }

      setDialog('track-audio-dialog', false);
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error('Something went wrong');
      toast.error(`Error! ${err.message}`);
    }
  };

  const handleFormSubmit = handleSubmit((dto) => {
    void onSubmit(dto);
  });

  return (
    <Form {...form}>
      <form onSubmit={(e) => void handleFormSubmit(e)} className='space-y-4'>
        <TrackAudioField control={control} trackId={trackData.id} initialAudioUrl={trackData?.audioFile} />

        <Button type='submit' disabled={!isModified}>
          Save
        </Button>
      </form>
    </Form>
  );
};

export { TrackAudioForm };
