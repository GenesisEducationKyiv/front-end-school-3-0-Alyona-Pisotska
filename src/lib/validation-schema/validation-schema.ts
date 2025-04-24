import * as z from 'zod';
import { isValidImageUrl } from '@/lib/utils/utils.ts';
import { MAX_AUDIO_FILE_SIZE, ALLOWED_AUDIO_TYPES } from '@/lib/constants/constants.ts';

const trackMetadataSchema = z.object({
  title: z.string().nonempty({ message: 'The field is required' }),
  artist: z.string().nonempty({ message: 'The field is required' }),
  album: z.string().optional(),
  genres: z.array(z.string()).optional(),
  coverImage: z.string().optional().refine(isValidImageUrl, {
    message: 'Please enter a valid image URL (jpg, png, etc.)',
  }),
});

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

export { trackMetadataSchema, audioSchema };
