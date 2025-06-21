import { useEffect, useQueryParams } from '@/hooks/hooks';
import { O } from '@mobily/ts-belt';
import { isValidQueryParam } from '@/lib/utils/utils';

import type { QueryParamKey, QueryParamValue } from '@/lib/types/types';

type UseValidatedQueryParamProps<T> = {
  option: O.Option<T>;
  validator: (value: T) => boolean;
  key: QueryParamKey;
  defaultValue: QueryParamValue;
};

const useValidatedQueryParam = <T>({
  option,
  validator,
  key,
  defaultValue,
}: UseValidatedQueryParamProps<T>): O.Option<T> => {
  const { set } = useQueryParams();

  const isValid = isValidQueryParam(option, validator);

  useEffect(() => {
    if (!isValid) {
      set(key, defaultValue, { replace: true });
    }
  }, [isValid, key, defaultValue, set]);

  return isValid ? option : O.None;
};

export { useValidatedQueryParam };
