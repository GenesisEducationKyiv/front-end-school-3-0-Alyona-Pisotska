import { useContext } from '@/hooks/hooks.ts';
import { TrackContext } from '@/contexts/contexts.ts';

const useTrackContext = () => {
  const context = useContext(TrackContext);

  if (!context) {
    throw new Error('useTrackContext must be used within a TrackContextProvider');
  }

  return context;
};

export { useTrackContext };
