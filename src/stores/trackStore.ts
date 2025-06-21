import { create } from 'zustand';

import type { Track } from '@/lib/types/types';

type TracksMap = Record<Track['id'], Track>;
type RequiredAudioFile = Exclude<Track['audioFile'], undefined>;

type TrackStore = {
  tracks: TracksMap;
  isLoadingTracks: boolean;
  totalPages: number;
  selectedTrackIds: Track['id'][];
  initializeTracks: (tracks: Track[]) => void;
  setIsLoading: (loading: boolean) => void;
  setTotalPages: (totalPages: number) => void;
  getTrackById: (trackId: Track['id']) => Track | undefined;
  updateTrack: (trackId: Track['id'], data: Partial<Track>) => void;
  resetTrack: (trackId: Track['id'], previous: Track) => void;
  addTrackAudio: (trackId: Track['id'], audioUrl: RequiredAudioFile) => void;
  deleteTrackAudio: (trackId: Track['id']) => void;
  setSelectedIds: (ids: Track['id'][]) => void;
  clearSelectedIds: () => void;
};

const useTrackStore = create<TrackStore>((set, get) => ({
  tracks: {},
  isLoadingTracks: false,
  totalPages: 1,
  selectedTrackIds: [],

  initializeTracks: (tracks) => {
    const tracksMap = tracks.reduce((acc, track) => {
      acc[track.id] = track;
      return acc;
    }, {} as TracksMap);
    set({ tracks: tracksMap });
  },
  setIsLoading: (loading) => set({ isLoadingTracks: loading }),
  setTotalPages: (totalPages) => set({ totalPages }),

  getTrackById: (trackId) => {
    return get().tracks[trackId];
  },

  updateTrack: (trackId, data) =>
    set((state) => {
      const existingTrack = state.tracks[trackId];
      if (!existingTrack) {
        return state;
      }
      return {
        tracks: {
          ...state.tracks,
          [trackId]: { ...existingTrack, ...data },
        },
      };
    }),

  resetTrack: (trackId, previous) =>
    set((state) => ({
      tracks: {
        ...state.tracks,
        [trackId]: previous,
      },
    })),

  addTrackAudio: (trackId, audioUrl) =>
    set((state) => {
      const existingTrack = state.tracks[trackId];
      if (!existingTrack) {
        return state;
      }
      return {
        tracks: {
          ...state.tracks,
          [trackId]: { ...existingTrack, audioFile: audioUrl },
        },
      };
    }),

  deleteTrackAudio: (trackId) =>
    set((state) => {
      const existingTrack = state.tracks[trackId];
      if (!existingTrack) {
        return state;
      }
      return {
        tracks: {
          ...state.tracks,
          [trackId]: { ...existingTrack, audioFile: '' },
        },
      };
    }),

  setSelectedIds: (ids) => set({ selectedTrackIds: ids }),
  clearSelectedIds: () => set({ selectedTrackIds: [] }),
}));

export { useTrackStore };
