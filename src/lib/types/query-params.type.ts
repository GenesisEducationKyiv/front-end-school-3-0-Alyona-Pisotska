import type { Option } from '@mobily/ts-belt';
import type { QUERY_PARAM_KEYS } from '@/lib/constants/constants';

type QueryParamKey = (typeof QUERY_PARAM_KEYS)[keyof typeof QUERY_PARAM_KEYS];

type QueryParamValue = string | number | boolean | null;

type QueryParamsHookType = {
  get: (key: QueryParamKey) => Option<string>;
  getAll: (key: QueryParamKey) => string[];
  getAllParams: () => URLSearchParams;
  set: (key: QueryParamKey, value: QueryParamValue, options?: { replace?: boolean }) => void;
  setMany: (updates: Partial<Record<QueryParamKey, QueryParamValue>>, options?: { replace?: boolean }) => void;
  remove: (key: QueryParamKey, options?: { replace?: boolean }) => void;
  clear: (options?: { replace?: boolean }) => void;
  getIntParam: (key: QueryParamKey) => Option<number>;
  getBooleanParam: (key: QueryParamKey) => Option<boolean>;
};

export type { QueryParamKey, QueryParamValue, QueryParamsHookType };
