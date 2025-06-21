import { create } from 'zustand';

import type { Track } from '@/lib/types/types';

type TracksMap = Record<Track['id'], Track>;
type RequiredAudioFile = Exclude<Track['audioFile'], undefined>;

type TrackStore = {
  tracks: TracksMap;
  isLoadingTracks: boolean;
  totalPages: number;
  initializeTracks: (tracks: Track[]) => void;
  setIsLoading: (loading: boolean) => void;
  setTotalPages: (totalPages: number) => void;
  getTrackById: (trackId: Track['id']) => Track | undefined;
  updateTrack: (trackId: Track['id'], data: Partial<Track>) => void;
  resetTrack: (trackId: Track['id'], previous: Track) => void;
  addTrackAudio: (trackId: Track['id'], audioUrl: RequiredAudioFile) => void;
  deleteTrackAudio: (trackId: Track['id']) => void;
};

const useTrackStore = create<TrackStore>((set, get) => ({
  tracks: {},
  isLoadingTracks: false,
  totalPages: 1,

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
        return state; // Якщо треку не існує, нічого не робимо
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
}));

export { useTrackStore };
