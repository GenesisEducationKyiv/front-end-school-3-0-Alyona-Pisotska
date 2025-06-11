import { useContext } from '@/hooks/hooks';
import { SearchTextContext } from '@/contexts/contexts';

const useSearchTextContext = () => {
  const context = useContext(SearchTextContext);

  if (!context) {
    throw new Error('useSearchTextContext must be used within a SearchTextContextProvider');
  }

  return context;
};

export { useSearchTextContext };
