import { useState, useEffect, useCallback, useSortQueryParams, useGetTrackList } from '@/hooks/hooks';
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
  const { trackList, isLoadingTrackList } = useGetTrackList();
  const { handleChangeSort, handleChangeOrder } = useSortQueryParams();

  const selectedTrackIds = useTrackStore((state) => state.selectedTrackIds);
  const setSelectedIds = useTrackStore((state) => state.setSelectedIds);

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
    data: trackList,
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
      <TrackSelectionToast />
    </>
  );
};

export { TracksTable };
