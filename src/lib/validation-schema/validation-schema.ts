import * as z from 'zod';

const trackMetadataSchema = z.object({
  title: z.string().nonempty({ message: 'The field is required' }),
  artist: z.string().nonempty({ message: 'The field is required' }),
  album: z.string().optional(),
  genre: z.array(z.string()).optional(),
  coverImageUrl: z.string().url({ message: 'Please enter the correct link to the image' }).optional(),
});

export { trackMetadataSchema };
