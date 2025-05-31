import { useState, useRef } from '@/hooks/hooks.ts';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Button } from '@/Components/components.ts';
import { ALLOWED_AUDIO_TYPES } from '@/lib/constants/constants.ts';

import type { Control, ControllerRenderProps } from 'react-hook-form';
import type { AudioData, Track } from '@/lib/types/types.ts';

const FILE_NAME = {
  uploading: 'Uploading file',
  empty: 'No file selected',
};
const AUDIO_ACCEPT_STRING = ALLOWED_AUDIO_TYPES.join(',');

type TrackAudioFieldProps = {
  control: Control<AudioData>;
  trackId: Track['id'];
  initialAudioUrl: string | undefined;
};

type ControlField = ControllerRenderProps<{ audioFile: '' | File }, 'audioFile'>;

const TrackAudioField = ({ control, trackId, initialAudioUrl }: TrackAudioFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>(initialAudioUrl || FILE_NAME.empty);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onChooseFile = (e: React.ChangeEvent<HTMLInputElement>, field: ControlField) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));

      field.onChange(file);
    } else {
      setFileName(FILE_NAME.empty);
      setPreviewUrl(null);

      field.onChange('');
    }
  };

  const onClearFile = (field: ControlField) => {
    setFileName(FILE_NAME.empty);
    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    field.onChange('');
  };

  return (
    <FormField
      control={control}
      name={'audioFile'}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Audio File</FormLabel>
          <FormControl>
            <div className='flex flex-col gap-2'>
              <input
                type='file'
                accept={AUDIO_ACCEPT_STRING}
                ref={(el) => {
                  fileInputRef.current = el;
                  field.ref(el);
                }}
                onChange={(e) => onChooseFile(e, field)}
                className='hidden'
                data-testid={`upload-track-${trackId}`}
              />

              <div className='flex items-center gap-4'>
                <Button type='button' variant='outline' onClick={() => fileInputRef.current?.click()}>
                  Choose file
                </Button>

                <span className='text-muted-foreground max-w-[200px] truncate text-sm'>{fileName}</span>

                {(previewUrl || initialAudioUrl) && (
                  <Button
                    type='button'
                    variant='ghost'
                    className='text-red-500 hover:text-red-600'
                    onClick={() => onClearFile(field)}
                  >
                    Clear file
                  </Button>
                )}
              </div>

              {previewUrl && (
                <audio controls className='mt-2 w-full' data-testid={`audio-player-${trackId}`}>
                  <source src={previewUrl} />
                </audio>
              )}
            </div>
          </FormControl>
          <FormMessage data-testid='error-audio-file' />
        </FormItem>
      )}
    />
  );
};

export { TrackAudioField };
