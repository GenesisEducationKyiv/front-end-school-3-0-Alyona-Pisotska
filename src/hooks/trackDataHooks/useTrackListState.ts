import {
  useGetTrackList,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useCreateTrack,
  useEditTrack,
  useDeleteTrack,
  useDeleteMultiTracks,
} from '@/hooks/hooks';

import type { Track, TrackPayload, TrackListQueryParams, PaginationMeta } from '@/lib/types/types';

type RequiredAudioFile = Exclude<Track['audioFile'], undefined>;

type TrackListState = {
  tracks: Track[];
  paginationData: PaginationMeta | null;
  isLoadingTrackList: boolean;
  totalPages: number;
  handleAddTrack: (value: TrackPayload) => Promise<void>;
  handleEditTrack: (id: Track['id'], value: TrackPayload) => Promise<void>;
  handleDeleteTrack: (id: Track['id']) => Promise<void>;
  handleDeleteMultiTracks: (ids: Track['id'][]) => Promise<void>;
  handleAddAudioTrack: (id: Track['id'], audioFile: RequiredAudioFile) => void;
  handleDeleteAudioTrack: (id: Track['id']) => void;
};

const useTrackListState = (params: TrackListQueryParams): TrackListState => {
  const [trackList, setTrackList] = useState<Track[]>([]);

  const { createNewTrack } = useCreateTrack();
  const { editTrack } = useEditTrack();
  const { deleteTrack } = useDeleteTrack();
  const { deleteMultiTracks } = useDeleteMultiTracks();

  const {
    trackList: fetchedTrackList,
    paginationData,
    isLoadingTrackList,
    isSuccessTrackList,
  } = useGetTrackList(params);

  const totalPages = useMemo(() => {
    return paginationData?.totalPages ?? 1;
  }, [paginationData?.totalPages]);

  useEffect(() => {
    if (!isLoadingTrackList && isSuccessTrackList) {
      setTrackList(fetchedTrackList);
    }
  }, [isLoadingTrackList, isSuccessTrackList, fetchedTrackList]);

  const handleAddTrack = useCallback(
    async (newTrack: TrackPayload) => {
      await createNewTrack(newTrack);
    },
    [createNewTrack],
  );

  const handleEditTrack = useCallback(
    async (trackId: Track['id'], editTrackData: TrackPayload) => {
      const previousTrack = trackList.find((track) => track.id === trackId);

      setTrackList((prevState) => {
        return prevState.map((track) => {
          if (track.id === trackId) {
            return { ...track, ...editTrackData };
          }

          return track;
        });
      });

      try {
        await editTrack({ id: trackId, payload: editTrackData });
      } catch {
        if (previousTrack) {
          setTrackList((prevState) => {
            return prevState.map((track) => {
              if (track.id === trackId) {
                return { ...track, ...previousTrack };
              }

              return track;
            });
          });
        }
      }
    },
    [editTrack, trackList],
  );

  const handleDeleteTrack = useCallback(
    async (trackId: Track['id']) => {
      await deleteTrack({ id: trackId });
    },
    [deleteTrack],
  );

  const handleDeleteMultiTracks = useCallback(
    async (trackIds: Track['id'][]) => {
      await deleteMultiTracks({ ids: trackIds });
    },
    [deleteMultiTracks],
  );

  const handleAddAudioTrack = useCallback((trackId: Track['id'], audioUrl: RequiredAudioFile) => {
    setTrackList((prevState) => {
      return prevState.map((track) => {
        if (track.id === trackId) {
          return { ...track, audioFile: audioUrl };
        }

        return track;
      });
    });
  }, []);

  const handleDeleteAudioTrack = useCallback((trackId: Track['id']) => {
    setTrackList((prevState) => {
      return prevState.map((track) => {
        if (track.id === trackId) {
          return { ...track, audioFile: '' };
        }

        return track;
      });
    });
  }, []);

  return {
    tracks: trackList,
    paginationData,
    isLoadingTrackList,
    totalPages,
    handleAddTrack,
    handleEditTrack,
    handleDeleteTrack,
    handleDeleteMultiTracks,
    handleAddAudioTrack,
    handleDeleteAudioTrack,
  } as const;
};

export { useTrackListState };
