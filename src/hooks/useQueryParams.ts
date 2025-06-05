import { useSearchParams } from 'react-router-dom';

import type { QueryParamsHookType } from '@/lib/types/types';

const useQueryParams = (): QueryParamsHookType => {
  const [params, setParams] = useSearchParams();

  const get: QueryParamsHookType['get'] = (key) => params.get(key);
  const getAll: QueryParamsHookType['getAll'] = (key) => params.getAll(key);
  const getAllParams: QueryParamsHookType['getAllParams'] = (): URLSearchParams => new URLSearchParams(params);

  const set: QueryParamsHookType['set'] = (key, value, options) => {
    const next = new URLSearchParams(params);

    if (value === null || value === '') {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }

    setParams(next, { replace: options?.replace ?? false });
  };

  const setMany: QueryParamsHookType['setMany'] = (updates, options) => {
    const next = new URLSearchParams(params);

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === '') {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    }

    setParams(next, { replace: options?.replace ?? false });
  };

  const remove: QueryParamsHookType['remove'] = (key, options) => {
    const next = new URLSearchParams(params);

    next.delete(key);
    setParams(next, { replace: options?.replace ?? false });
  };

  const clear: QueryParamsHookType['clear'] = (options) => {
    setParams(new URLSearchParams(), { replace: options?.replace ?? true });
  };

  const getIntParam: QueryParamsHookType['getIntParam'] = (key) => {
    const value = params.get(key);

    return value ? parseInt(value, 10) : null;
  };

  const getBooleanParam: QueryParamsHookType['getBooleanParam'] = (key) => {
    const value = params.get(key);

    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }

    return null;
  };

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
