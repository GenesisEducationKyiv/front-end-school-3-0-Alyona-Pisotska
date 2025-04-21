import { TableCell, TableRow } from '@/Components/components.ts';
import { TABLE_COLUMNS } from './components.ts';

const EmptyTable = () => {
  return (
    <TableRow>
      <TableCell colSpan={TABLE_COLUMNS.length} className='h-24 text-center'>
        No results
      </TableCell>
    </TableRow>
  );
};

export { EmptyTable };
