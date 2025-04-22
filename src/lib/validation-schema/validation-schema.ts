import * as z from 'zod';
import { isValidImageUrl } from '@/lib/utils/utils.ts';

const trackMetadataSchema = z.object({
  title: z.string().nonempty({ message: 'The field is required' }),
  artist: z.string().nonempty({ message: 'The field is required' }),
  album: z.string().optional(),
  genre: z.array(z.string()).optional(),
  coverImageUrl: z.string().optional().refine(isValidImageUrl, {
    message: 'Please enter a valid image URL (jpg, png, etc.)',
  }),
});

export { trackMetadataSchema };
