import { z } from 'zod';
import {
  trackMetadataSchema,
  paginationSchema,
  trackListResponseSchema,
  trackSchema,
} from '@/lib/validation-schema/validation-schema.ts';

import type { Order } from './types.ts';

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

type TrackPayload = Pick<Track, 'title' | 'artist' | 'album' | 'coverImage'> & {
  genres: string[];
};

export type { Track, PaginationMeta, TrackListResponse, TrackListQueryParams, TrackMetadataValues, TrackPayload };
