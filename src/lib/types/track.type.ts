import type { z } from 'zod';
import type {
  trackMetadataSchema,
  paginationSchema,
  trackListResponseSchema,
  trackSchema,
} from '@/lib/validation-schema/validation-schema';
import type { Order } from './types';

type Track = z.infer<typeof trackSchema>;
type TrackListResponse = z.infer<typeof trackListResponseSchema>;
type PaginationMeta = z.infer<typeof paginationSchema>;
type TrackMetadataValues = z.infer<typeof trackMetadataSchema>;

type TrackListQueryParams = {
  page: number;
  sort: string;
  order: Order;
  search?: string;
  genre?: string;
  artist?: string;
};

type TrackPayload = Pick<Track, 'title' | 'artist' | 'album' | 'coverImage' | 'genres'>;

export type { Track, PaginationMeta, TrackListResponse, TrackListQueryParams, TrackMetadataValues, TrackPayload };
