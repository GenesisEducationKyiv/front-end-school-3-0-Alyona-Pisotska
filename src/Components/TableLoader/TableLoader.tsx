import { Loader, TableCell, TableRow } from '@/Components/components.ts';

type TableLoaderProps = {
  colSpan: number;
};

const TableLoader = ({ colSpan }: TableLoaderProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Loader />
      </TableCell>
    </TableRow>
  );
};

export { TableLoader };
