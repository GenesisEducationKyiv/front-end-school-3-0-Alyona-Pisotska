import { useEffect, useQueryParamsContext } from '@/hooks/hooks';
import { QUERY_PARAM_KEYS } from '@/lib/constants/constants';

import type { QueryParamKey, QueryParamValue } from '@/lib/types/types';

const useResetInvalidQueryParam = (isValid: boolean, key: QueryParamKey, defaultValue: QueryParamValue) => {
  const { set } = useQueryParamsContext();

  useEffect(() => {
    if (!isValid) {
      set(QUERY_PARAM_KEYS[key], defaultValue, { replace: true });
    }
  }, [isValid, key, defaultValue, set]);
};

export { useResetInvalidQueryParam };
