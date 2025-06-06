import { useContext } from '@/hooks/hooks';
import { QueryParamsContext } from '@/contexts/contexts';

const useQueryParamsContext = () => {
  const context = useContext(QueryParamsContext);

  if (!context) {
    throw new Error('useQueryParamsContext must be used within a QueryParamsProvider');
  }

  return context;
};

export { useQueryParamsContext };
