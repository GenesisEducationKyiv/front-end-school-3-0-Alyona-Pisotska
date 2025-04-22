import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button, Checkbox } from '@/Components/components.ts';
import { EmptyDataCell, TrackActionsDropdownMenu } from './components.ts';
import { TRACK_TABLE_CELL_IDS } from '@/lib/constants/constants.ts';

import type { Track } from '@/lib/types/types.ts';

const TABLE_CELL_DATA = {
  select: { id: TRACK_TABLE_CELL_IDS.select, label: '' },
  artist: { id: TRACK_TABLE_CELL_IDS.artist, label: 'Artist' },
  title: { id: TRACK_TABLE_CELL_IDS.title, label: 'Composition' },
  album: { id: TRACK_TABLE_CELL_IDS.album, label: 'Album' },
  genres: { id: TRACK_TABLE_CELL_IDS.genres, label: 'Genres' },
  actions: { id: TRACK_TABLE_CELL_IDS.actions, label: '' },
};

const TABLE_COLUMNS: ColumnDef<Track>[] = [
  {
    id: TABLE_CELL_DATA.select.id,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: TABLE_CELL_DATA.artist.id,
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          {TABLE_CELL_DATA.artist.label}
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='font-medium'>{row.getValue(TABLE_CELL_DATA.artist.id)}</div>,
  },
  {
    accessorKey: TABLE_CELL_DATA.title.id,
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          {TABLE_CELL_DATA.title.label}
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue(TABLE_CELL_DATA.title.id),
  },
  {
    accessorKey: TABLE_CELL_DATA.album.id,
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <div className='text-right'>{TABLE_CELL_DATA.album.label}</div>
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue(TABLE_CELL_DATA.album.id) || <EmptyDataCell />,
  },
  {
    accessorKey: TABLE_CELL_DATA.genres.id,
    header: () => <div className='text-right'>{TABLE_CELL_DATA.genres.label}</div>,
    cell: ({ row }) => {
      const genres: Track['genre'] = row.getValue(TABLE_CELL_DATA.genres.id);

      if (!genres.length) {
        return <EmptyDataCell textAlign='right' />;
      }

      return (
        <>
          {genres.map((genre) => (
            <div className='text-right' key={genre}>
              {genre}
            </div>
          ))}
        </>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className='text-right'>{TABLE_CELL_DATA.actions.label}</div>,
    cell: ({ row }) => <TrackActionsDropdownMenu track={row.original} />,
  },
];

export { TABLE_COLUMNS };
