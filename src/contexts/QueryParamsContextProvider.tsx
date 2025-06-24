import React, { createContext } from 'react';
import { useQueryParams } from '@/hooks/hooks';

import type { QueryParamsHookType } from '@/lib/types/types';

type QueryParamsContextProviderProps = {
  children: React.ReactNode;
};

const QueryParamsContext = createContext<QueryParamsHookType | null>(null);

const QueryParamsProvider = ({ children }: QueryParamsContextProviderProps) => {
  const { get, getAll, getAllParams, set, setMany, remove, clear, getIntParam, getBooleanParam } = useQueryParams();

  return (
    <QueryParamsContext.Provider
      value={{
        get,
        getAll,
        getAllParams,
        set,
        setMany,
        remove,
        clear,
        getIntParam,
        getBooleanParam,
      }}
    >
      {children}
    </QueryParamsContext.Provider>
  );
};

export { QueryParamsProvider, QueryParamsContext };
