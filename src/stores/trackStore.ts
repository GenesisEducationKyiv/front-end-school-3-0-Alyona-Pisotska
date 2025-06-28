import { create } from 'zustand';

import type { Track } from '@/lib/types/types';

type TrackStore = {
  selectedTrackIds: Track['id'][];
  setSelectedIds: (ids: Track['id'][]) => void;
  clearSelectedIds: () => void;
};

const useTrackStore = create<TrackStore>((set) => ({
  selectedTrackIds: [],
  setSelectedIds: (ids) => set({ selectedTrackIds: ids }),
  clearSelectedIds: () => set({ selectedTrackIds: [] }),
}));

export { useTrackStore };
