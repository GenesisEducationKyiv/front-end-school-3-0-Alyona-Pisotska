import { create } from 'zustand';

import type { DialogIds } from '@/lib/types/types';

type DialogStore = {
  openDialogs: Record<DialogIds, boolean>;
  setDialog: (id: DialogIds, state: boolean) => void;
  isOpen: (id: DialogIds) => boolean;
};

const useDialogStore = create<DialogStore>((set, get) => ({
  openDialogs: {
    'track-audio-dialog': false,
    'create-track-dialog': false,
    'edit-track-dialog': false,
  },
  setDialog: (id, state) =>
    set((s) => ({
      openDialogs: {
        ...s.openDialogs,
        [id]: state,
      },
    })),
  isOpen: (id) => get().openDialogs[id],
}));

export { useDialogStore };
