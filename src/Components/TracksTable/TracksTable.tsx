import { useState, useEffect, useCallback, useMemo, useSortQueryParams } from '@/hooks/hooks';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  type ColumnSort,
} from '@tanstack/react-table';
import { Table, TableBody, TableLoader } from '@/Components/components';
import {
  EmptyTable,
  TABLE_COLUMNS,
  TrackSelectionToast,
  TracksTableHeader,
  TracksTableRow,
} from './components/components';
import { useTrackStore } from '@/stores/stores';
import { cn, isTrackListSortableColumn } from '@/lib/utils/utils';
import { ORDER_BY } from '@/lib/constants/constants';

import type { Track, Order } from '@/lib/types/types';

const TracksTable = () => {
  const tracksMap = useTrackStore((state) => state.tracks);
  const isLoadingTracks = useTrackStore((state) => state.isLoadingTracks);
  const selectedTrackIds = useTrackStore((state) => state.selectedTrackIds);
  const setSelectedIds = useTrackStore((state) => state.setSelectedIds);

  const { handleChangeSort, handleChangeOrder } = useSortQueryParams();

  const tracks = useMemo(() => {
    return Object.values(tracksMap);
  }, [tracksMap]);

  const [sorting, setSorting] = useState<SortingState>([]);

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
    onRowSelectionChange: (updater) => {
      const newState =
        typeof updater === 'function' ? updater(Object.fromEntries(selectedTrackIds.map((id) => [id, true]))) : updater;
      const newIds = Object.keys(newState).filter((id) => newState[id]);

      setSelectedIds(newIds);
    },
    state: {
      sorting,
      rowSelection: Object.fromEntries(selectedTrackIds.map((id) => [id, true])),
    },
    getRowId: (row) => row.id,
  });

  const headersGroup = table.getHeaderGroups();
  const tableRows = table.getRowModel().rows;

  return (
    <>
      <Table
        className={cn(isLoadingTracks && 'h-full', 'w-full border-y')}
        data-loading={isLoadingTracks ? 'true' : undefined}
      >
        <TracksTableHeader headersGroup={headersGroup} />
        <TableBody>
          {isLoadingTracks ? (
            <TableLoader colSpan={TABLE_COLUMNS.length} />
          ) : tableRows.length ? (
            tableRows.map((row) => <TracksTableRow row={row} key={row.id} />)
          ) : (
            <EmptyTable />
          )}
        </TableBody>
      </Table>
      <TrackSelectionToast />
    </>
  );
};

export { TracksTable };
