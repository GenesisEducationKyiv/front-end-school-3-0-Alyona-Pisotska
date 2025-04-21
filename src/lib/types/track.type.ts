type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string[];
  slug: string;
  coverImage: string;
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

export { Track, PaginationMeta, TrackListResponse };
