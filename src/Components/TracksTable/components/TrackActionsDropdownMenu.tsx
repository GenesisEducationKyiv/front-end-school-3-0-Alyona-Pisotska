import { MoreVertical } from 'lucide-react';
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
          <DropdownMenuItem>Delete track</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { TrackActionsDropdownMenu };
