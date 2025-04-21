import * as z from 'zod';

const trackMetadataSchema = z.object({
  title: z.string().nonempty({ message: 'The field is required' }),
});

export { trackMetadataSchema };
