import { create } from 'zustand';

type DialogStore = {
  isDialogOpen: boolean;
  setDialog: (state: boolean) => void;
};

const useDialogStore = create<DialogStore>((set) => ({
  isDialogOpen: false,
  setDialog: (state) => set({ isDialogOpen: state }),
}));

export { useDialogStore };
