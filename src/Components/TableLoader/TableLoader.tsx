import { Loader, TableCell, TableRow } from '@/Components/components';

type TableLoaderProps = {
  colSpan: number;
};

const TableLoader = ({ colSpan }: TableLoaderProps) => {
  return (
    <TableRow data-testid='loading-tracks'>
      <TableCell colSpan={colSpan}>
        <Loader />
      </TableCell>
    </TableRow>
  );
};

export { TableLoader };
