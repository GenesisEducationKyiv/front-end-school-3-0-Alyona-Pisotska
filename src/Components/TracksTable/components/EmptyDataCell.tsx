import { cn } from '@/lib/utils/utils';

const EmptyDataCell = ({ textAlign = 'left' }: { textAlign?: 'left' | 'center' | 'right' }) => {
  return <div className={cn(`text-${textAlign}`, 'text-muted-foreground')}>n/a</div>;
};

export { EmptyDataCell };
