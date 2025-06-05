import { useContext } from '@/hooks/hooks.ts';
import { QueryParamsContext } from '@/contexts/contexts.ts';

const useQueryParamsContext = () => {
  const context = useContext(QueryParamsContext);

  if (!context) {
    throw new Error('useQueryParamsContext must be used within a QueryParamsProvider');
  }

  return context;
};

export { useQueryParamsContext };
