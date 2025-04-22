import { MoreVertical } from 'lucide-react';
import { useTrackContext } from '@/hooks/hooks.ts';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TrackFormDialogButton,
} from '@/Components/components.ts';

import type { Track } from '@/lib/types/types.ts';

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
          <TrackFormDialogButton
            triggerComponent={
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>Edit track</DropdownMenuItem>
            }
            actionType={'edit'}
            initialTrackData={track}
          />
          <DropdownMenuItem onSelect={() => handleDeleteTrack(track.id)}>Delete track</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { TrackActionsDropdownMenu };
