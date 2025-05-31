import { useTrackContext, useState, useEffect, useCallback } from '@/hooks/hooks.ts';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { Table, TableBody, TableLoader } from '@/Components/components.ts';
import { EmptyTable, TABLE_COLUMNS, TracksTableHeader, TracksTableRow } from './components/components.ts';
import { cn, isTrackListSortableColumn } from '@/lib/utils/utils.ts';
import { showTrackActionToast } from './libs/helpers.ts';
import { ORDER_BY } from '@/lib/constants/constants.ts';

import type { Track, Order } from '@/lib/types/types.ts';

const TracksTable = () => {
  const { tracks, isLoadingTrackList, handleChangeOrder, handleChangeSort, handleDeleteMultiTracks } =
    useTrackContext();

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
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedIds = selectedRows.map((row) => row.original.id);
  const tableRows = table.getRowModel().rows;

  const onDeleteTracksClick = useCallback(async () => {
    try {
      await handleDeleteMultiTracks(selectedIds);
    } finally {
      setRowSelection({});
    }
  }, [handleDeleteMultiTracks, selectedIds]);

  useEffect(() => {
    showTrackActionToast(selectedIds, onDeleteTracksClick);
  }, [selectedIds, onDeleteTracksClick]);

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

  return (
    <Table
      className={cn(isLoadingTrackList && 'h-full', 'w-full border-y')}
      data-loading={isLoadingTrackList ? 'true' : undefined}
    >
      <TracksTableHeader headersGroup={headersGroup} />
      <TableBody>
        {isLoadingTrackList ? (
          <TableLoader colSpan={TABLE_COLUMNS.length} />
        ) : (
          tableRows.map((row) => <TracksTableRow row={row} key={row.id} />) || <EmptyTable />
        )}
      </TableBody>
    </Table>
  );
};

export { TracksTable };
