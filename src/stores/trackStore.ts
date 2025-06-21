import { create } from 'zustand';

import type { Track } from '@/lib/types/types';

type RequiredAudioFile = Exclude<Track['audioFile'], undefined>;

type TrackStore = {
  tracks: Track[];
  isLoadingTracks: boolean;
  totalPages: number;
  initializeTracks: (tracks: Track[]) => void;
  setIsLoading: (loading: boolean) => void;
  setTotalPages: (totalPages: number) => void;
  getTrackById: (trackId: Track['id']) => Track | undefined;
  updateTrack: (trackId: Track['id'], data: Partial<Track>) => void;
  resetTrack: (trackId: Track['id'], previous: Track) => void;
  addAudioFile: (trackId: Track['id'], audioUrl: RequiredAudioFile) => void;
  deleteAudioFile: (trackId: Track['id']) => void;
};

const useTrackStore = create<TrackStore>((set, get) => ({
  tracks: [],
  isLoadingTracks: false,
  totalPages: 1,

  initializeTracks: (tracks) => set({ tracks }),
  setIsLoading: (loading) => set({ isLoadingTracks: loading }),
  setTotalPages: (totalPages) => set({ totalPages }),

  getTrackById: (trackId) => {
    return get().tracks.find((track) => track.id === trackId);
  },

  updateTrack: (trackId, data) =>
    set((state) => ({
      tracks: state.tracks.map((track) => (track.id === trackId ? { ...track, ...data } : track)),
    })),
  resetTrack: (trackId, previous) =>
    set((state) => ({
      tracks: state.tracks.map((track) => (track.id === trackId ? previous : track)),
    })),

  addAudioFile: (trackId, audioUrl) =>
    set((state) => ({
      tracks: state.tracks.map((track) => (track.id === trackId ? { ...track, audioFile: audioUrl } : track)),
    })),

  deleteAudioFile: (trackId) =>
    set((state) => ({
      tracks: state.tracks.map((track) => (track.id === trackId ? { ...track, audioFile: '' } : track)),
    })),
}));

export { useTrackStore };
