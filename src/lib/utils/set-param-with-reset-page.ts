import { QUERY_PARAM_KEYS, INITIAL_QUERY_PARAMS_VALUE } from '@/lib/constants/constants';

import type { QueryParamKey, QueryParamsHookType, QueryParamValue } from '@/lib/types/types';

const setParamWithResetPage = (key: QueryParamKey, value: QueryParamValue, setMany: QueryParamsHookType['setMany']) => {
  setMany({
    [QUERY_PARAM_KEYS.page]: INITIAL_QUERY_PARAMS_VALUE.page,
    [QUERY_PARAM_KEYS[key]]: value,
  });
};

export { setParamWithResetPage };
