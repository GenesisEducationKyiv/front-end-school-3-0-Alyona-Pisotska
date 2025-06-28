import { useEffect, useQueryParams } from '@/hooks/hooks';
import { O, pipe } from '@mobily/ts-belt';

import type { QueryParamKey, QueryParamValue } from '@/lib/types/types';

type NonNullQueryParamValue = NonNullable<QueryParamValue>;

type UseValidatedQueryParamProps<T, U extends NonNullable<T>> = {
  option: O.Option<T>;
  validator: (value: T) => value is U;
  key: QueryParamKey;
  defaultValue: U & NonNullQueryParamValue;
};

const useValidatedQueryParam = <T, U extends NonNullable<T>>({
  option,
  validator,
  key,
  defaultValue,
}: UseValidatedQueryParamProps<T, U>): U => {
  const { set } = useQueryParams();

  const validatedOption: O.Option<U> = pipe(
    option,
    O.flatMap((val: T) => (validator(val) ? O.Some(val) : O.None)),
  );

  const isValid = O.isSome(validatedOption);

  useEffect(() => {
    if (!isValid) {
      set(key, defaultValue, { replace: true });
    }
  }, [isValid, key, defaultValue, set]);

  return O.getWithDefault(validatedOption, defaultValue);
};

export { useValidatedQueryParam };
