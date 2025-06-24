import { useTrackContext, useState, useEffect, useCallback, useMemo } from '@/hooks/hooks';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnSort,
} from '@tanstack/react-table';
import { Table, TableBody, TableLoader } from '@/Components/components';
import { EmptyTable, TABLE_COLUMNS, TracksTableHeader, TracksTableRow } from './components/components';
import { cn, isTrackListSortableColumn } from '@/lib/utils/utils';
import { showTrackActionToast } from './libs/helpers';
import { ORDER_BY } from '@/lib/constants/constants';

import type { Track, Order } from '@/lib/types/types';

const TracksTable = () => {
  const { tracks, isLoadingTrackList, handleChangeOrder, handleChangeSort, handleDeleteMultiTracks } =
    useTrackContext();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const handleChangeTrackContextData = useCallback(
    (sortingData: ColumnSort) => {
      const { desc, id } = sortingData;
      const orderBy: Order = desc ? ORDER_BY.desc : ORDER_BY.asc;

      handleChangeOrder(orderBy);

      if (isTrackListSortableColumn(id)) {
        handleChangeSort(id);
      }
    },
    [handleChangeOrder, handleChangeSort],
  );

  useEffect(() => {
    if (sorting.length > 0) {
      handleChangeTrackContextData(sorting[0]);
    }
  }, [sorting, handleChangeTrackContextData]);

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
  const tableRows = table.getRowModel().rows;
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const selectedIds = useMemo(() => {
    return selectedRows.map((row) => row.original.id);
  }, [selectedRows]);

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

  return (
    <Table
      className={cn(isLoadingTrackList && 'h-full', 'w-full border-y')}
      data-loading={isLoadingTrackList ? 'true' : undefined}
      data-testid='tracks-table'
    >
      <TracksTableHeader headersGroup={headersGroup} />
      <TableBody>
        {isLoadingTrackList ? (
          <TableLoader colSpan={TABLE_COLUMNS.length} />
        ) : tableRows.length ? (
          tableRows.map((row) => <TracksTableRow row={row} key={row.id} />)
        ) : (
          <EmptyTable />
        )}
      </TableBody>
    </Table>
  );
};

export { TracksTable };
