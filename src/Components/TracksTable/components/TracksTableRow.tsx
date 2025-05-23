import { flexRender, Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/Components/components.ts';

import type { Track } from '@/lib/types/types.ts';

type TracksTableRowProps = {
  row: Row<Track>;
};

const TracksTableRow = ({ row }: TracksTableRowProps) => {
  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} data-testid={`track-item-${row.original.id}`}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  );
};

export { TracksTableRow };
