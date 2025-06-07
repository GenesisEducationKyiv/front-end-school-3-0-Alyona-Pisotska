import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

import type { QueryParamsHookType } from '@/lib/types/types';

const setParamWithResetPage = <T>(
  key: keyof typeof QUERY_PARAM_KEYS,
  value: T,
  setMany: QueryParamsHookType['setMany'],
) => {
  setMany({
    [QUERY_PARAM_KEYS.page]: INITIAL_QUERY_PARAMS_VALUE.page,
    [QUERY_PARAM_KEYS[key]]: value,
  });
};

export { setParamWithResetPage };
