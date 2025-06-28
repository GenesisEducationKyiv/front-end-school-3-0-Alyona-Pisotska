import type { z } from 'zod';
import type {
  trackMetadataSchema,
  paginationSchema,
  trackListResponseSchema,
  trackSchema,
} from '@/lib/validation-schema/validation-schema';

type Track = z.infer<typeof trackSchema>;
type TrackListResponse = z.infer<typeof trackListResponseSchema>;
type PaginationMeta = z.infer<typeof paginationSchema>;
type TrackMetadataValues = z.infer<typeof trackMetadataSchema>;

type TrackPayload = Pick<Track, 'title' | 'artist' | 'album' | 'coverImage' | 'genres'>;

export type { Track, PaginationMeta, TrackListResponse, TrackMetadataValues, TrackPayload };
