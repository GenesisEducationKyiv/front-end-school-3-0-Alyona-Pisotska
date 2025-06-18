import * as z from 'zod';
import { isValidImageUrl } from '@/lib/utils/utils';
import { trackSchema } from '@/lib/validation-schema/validation-schema';

const baseMetadataSchema = trackSchema.pick({
  title: true,
  artist: true,
  album: true,
  genres: true,
  coverImage: true,
});

const trackMetadataSchema = baseMetadataSchema.extend({
  title: z.string().nonempty({ message: 'The field is required' }),
  artist: z.string().nonempty({ message: 'The field is required' }),
  coverImage: z.string().optional().refine(isValidImageUrl, {
    message: 'Please enter a valid image URL (jpg, png, etc.)',
  }),
  genres: z.array(z.string()).optional(),
});

export { trackMetadataSchema };
