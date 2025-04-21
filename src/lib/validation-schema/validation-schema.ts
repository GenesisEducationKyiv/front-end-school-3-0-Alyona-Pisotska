import * as z from 'zod';

const trackMetadataSchema = z.object({
  title: z.string().nonempty({ message: 'The field is required' }),
  artist: z.string().nonempty({ message: 'The field is required' }),
  album: z.string().optional(),
});

export { trackMetadataSchema };
