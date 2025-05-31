import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '@/Components/components.ts';

import type { Track } from '@/lib/types/types.ts';

type TracksTableHeaderProps = {
  headersGroup: HeaderGroup<Track>[];
};

const TracksTableHeader = ({ headersGroup }: TracksTableHeaderProps) => {
  return (
    <TableHeader>
      {headersGroup.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export { TracksTableHeader };
