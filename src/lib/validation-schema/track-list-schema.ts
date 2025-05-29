import { z } from 'zod';

const trackSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  album: z.string().optional(),
  genres: z.array(z.string()),
  slug: z.string(),
  coverImage: z.union([z.string().url(), z.literal('')]).optional(),
  audioFile: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const paginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
  limit: z.number(),
});

const trackListResponseSchema = z.object({
  data: z.array(trackSchema),
  meta: paginationSchema,
});

export { trackSchema, paginationSchema, trackListResponseSchema };
