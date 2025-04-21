import { useTrackContext, useState, useEffect } from '@/hooks/hooks.ts';
import {
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, Loader } from '@/Components/components.ts';
import { EmptyTable, TABLE_COLUMNS, TracksTableHeader, TracksTableRow } from './components/components.ts';
import { isTrackListSortableColumn } from '@/lib/utils/utils.ts';
import { ORDER_BY } from '@/lib/constants/constants.ts';

import type { Track, Order } from '@/lib/types/types.ts';

const TracksTable = () => {
  const { tracks, isLoadingTrackList, handleChangeOrder, handleChangeSort } = useTrackContext();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable<Track>({
    data: tracks,
    columns: TABLE_COLUMNS,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const headersGroup = table.getHeaderGroups();
  const selectedRawsCount = table.getFilteredSelectedRowModel().rows.length;

  useEffect(() => {
    if (sorting.length) {
      const { desc, id } = sorting[0];
      const orderBy: Order = desc ? ORDER_BY.desc : ORDER_BY.asc;

      handleChangeOrder(orderBy);

      if (isTrackListSortableColumn(id)) {
        handleChangeSort(id);
      }
    }
  }, [handleChangeOrder, handleChangeSort, sorting]);

  if (isLoadingTrackList) {
    return <Loader />;
  }

  return (
    <Table className='w-full border-y'>
      <TracksTableHeader headersGroup={headersGroup} />
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => <TracksTableRow row={row} key={row.id} />)
        ) : (
          <EmptyTable />
        )}
      </TableBody>
    </Table>
  );
};

export { TracksTable };
