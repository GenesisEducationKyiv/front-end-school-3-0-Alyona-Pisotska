import { useCallback, useSearchParams } from '@/hooks/hooks';
import { O, pipe } from '@mobily/ts-belt';

import type { QueryParamKey, QueryParamsHookType, QueryParamValue } from '@/lib/types/types';

const updateParams = (prev: URLSearchParams, key: QueryParamKey, value: QueryParamValue): void => {
  if (value === null || value === undefined) {
    prev.delete(key);
  } else {
    prev.set(key, String(value));
  }
};

const useQueryParams = (): QueryParamsHookType => {
  const [params, setParams] = useSearchParams();

  const get: QueryParamsHookType['get'] = useCallback(
    (key) => {
      return O.fromNullable(params.get(key));
    },
    [params],
  );

  const getAll: QueryParamsHookType['getAll'] = useCallback(
    (key) => {
      return params.getAll(key);
    },
    [params],
  );

  const getAllParams: QueryParamsHookType['getAllParams'] = useCallback(() => {
    return new URLSearchParams(params);
  }, [params]);

  const set: QueryParamsHookType['set'] = useCallback(
    (key, value, options) => {
      setParams(
        (prev) => {
          updateParams(prev, key, value);

          return prev;
        },
        { replace: options?.replace ?? false },
      );
    },
    [setParams],
  );

  const setMany: QueryParamsHookType['setMany'] = useCallback(
    (updates, options) => {
      setParams(
        (prev) => {
          for (const [key, value] of Object.entries(updates) as [QueryParamKey, QueryParamValue][]) {
            updateParams(prev, key, value);
          }
          return prev;
        },
        { replace: options?.replace ?? false },
      );
    },
    [setParams],
  );

  const remove: QueryParamsHookType['remove'] = useCallback(
    (key, options) => {
      setParams(
        (prev) => {
          prev.delete(key);

          return prev;
        },
        { replace: options?.replace ?? false },
      );
    },
    [setParams],
  );

  const clear: QueryParamsHookType['clear'] = useCallback(
    (options) => {
      setParams(new URLSearchParams(), { replace: options?.replace ?? true });
    },
    [setParams],
  );

  const getIntParam: QueryParamsHookType['getIntParam'] = useCallback(
    (key) =>
      pipe(
        get(key),
        O.fromNullable,
        O.flatMap((s) => {
          const parsed = parseInt(s, 10);
          return Number.isFinite(parsed) ? O.Some(parsed) : O.None;
        }),
      ),
    [get],
  );

  const getBooleanParam: QueryParamsHookType['getBooleanParam'] = useCallback(
    (key) =>
      pipe(
        get(key),
        O.fromNullable,
        O.flatMap((s) => {
          if (s === 'true') {
            return O.Some(true);
          }

          if (s === 'false') {
            return O.Some(false);
          }

          return O.None;
        }),
      ),
    [get],
  );

  return {
    get,
    getAll,
    getAllParams,
    set,
    setMany,
    remove,
    clear,
    getIntParam,
    getBooleanParam,
  };
};

export { useQueryParams };
