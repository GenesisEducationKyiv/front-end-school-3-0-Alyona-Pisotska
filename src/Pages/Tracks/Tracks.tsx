import {
  usePageQueryParam,
  useSearchArtistQueryParam,
  useSearchQueryParam,
  useSelectGenreQueryParam,
  useSortQueryParams,
  useSyncTrackStore,
} from '@/hooks/hooks';
import { Layout, Toaster } from '@/Components/components';

const TracksPage = () => {
  const { page } = usePageQueryParam();
  const { selectedGenre } = useSelectGenreQueryParam();
  const { sortBy, orderBy } = useSortQueryParams();
  const { debouncedSearchArtist } = useSearchArtistQueryParam();
  const { debouncedSearchText } = useSearchQueryParam();

  useSyncTrackStore({
    page,
    genre: selectedGenre,
    sort: sortBy,
    order: orderBy,
    artist: debouncedSearchArtist,
    search: debouncedSearchText,
  });

  return (
    <>
      <Layout />
      <Toaster position='bottom-left' data-testid='toast-container' richColors />
    </>
  );
};

export default TracksPage;
