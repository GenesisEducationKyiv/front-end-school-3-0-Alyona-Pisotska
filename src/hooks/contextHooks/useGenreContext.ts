import { useContext } from '@/hooks/hooks';
import { GenreContext } from '@/contexts/contexts';

const useGenreContext = () => {
  const context = useContext(GenreContext);

  if (!context) {
    throw new Error('useGenreContext must be used within a GenreContextProvider');
  }

  return context;
};

export { useGenreContext };
