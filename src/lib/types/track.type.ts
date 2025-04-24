import { z } from 'zod';
import { trackMetadataSchema } from '@/lib/validation-schema/validation-schema.ts';

import type { Order } from './types.ts';

type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string[];
  slug: string;
  coverImage: string;
  audioFile?: string;
};

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type TrackListResponse = {
  data: Track[];
  meta: PaginationMeta;
};

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

type TrackMetadataValues = z.infer<typeof trackMetadataSchema>;

export type { Track, PaginationMeta, TrackListResponse, TrackListQueryParams, TrackMetadataValues, TrackPayload };
