import { toast } from 'sonner';

import { Track } from '@/lib/types/types.ts';

const SELECTED_TOAST_ID = 'selected-toast';

const showTrackActionToast = (selectedIds: Track['id'][], action: () => void) => {
  if (!selectedIds.length) {
    toast.dismiss(SELECTED_TOAST_ID);
    return;
  }

  toast.info(`Delete ${selectedIds.length} track(s)`, {
    id: SELECTED_TOAST_ID,
    duration: Infinity,
    action: {
      label: 'Delete track',
      onClick: action,
    },
  });
};

export { showTrackActionToast };
