import { ORDER_BY } from '@/lib/constants/constants';

import type { Order } from '@/lib/types/types';

const isValidOrder = (value: string): value is Order => {
  return value === ORDER_BY.asc || value === ORDER_BY.desc;
};

export { isValidOrder };
