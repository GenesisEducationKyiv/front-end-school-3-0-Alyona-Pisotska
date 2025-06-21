import { MoreVertical } from 'lucide-react';
import { useTrackContext } from '@/hooks/hooks';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TrackFormDialogButton,
  TrackAudioDialog,
} from '@/Components/components';

import type { Track } from '@/lib/types/types';

type TrackActionsDropdownMenuProps = {
  track: Track;
};

const TrackActionsDropdownMenu = ({ track }: TrackActionsDropdownMenuProps) => {
  const { handleDeleteTrack } = useTrackContext();
  return (
    <div className='flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <TrackAudioDialog
            triggerComponent={
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>Track audio</DropdownMenuItem>
            }
            trackData={track}
          />
          <TrackFormDialogButton
            triggerComponent={
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>Edit track</DropdownMenuItem>
            }
            actionType={'edit'}
            initialTrackData={track}
          />
          <DropdownMenuItem data-testid={`delete-track-${track.id}`} onSelect={() => void handleDeleteTrack(track.id)}>
            Delete track
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { TrackActionsDropdownMenu };
