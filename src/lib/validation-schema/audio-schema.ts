import * as z from 'zod';
import { MAX_AUDIO_FILE_SIZE, ALLOWED_AUDIO_TYPES } from '@/lib/constants/constants.ts';

const audioSchema = z.object({
  audioFile: z.union([
    z
      .instanceof(File)
      .refine((file) => ALLOWED_AUDIO_TYPES.includes(file.type), {
        message: 'Unsupported file type. Only MP3 and WAV files are allowed.',
      })
      .refine((file) => file.size <= MAX_AUDIO_FILE_SIZE, {
        message: 'File size must be 10MB or less.',
      }),
    z.literal(''),
  ]),
});

export { audioSchema };
