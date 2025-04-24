import { Routes, Route, Navigate } from 'react-router-dom';
import TracksPage from '@/Pages/Tracks/Tracks.tsx';
import { APP_ROUTES } from './lib/constants/constants.ts';

import './index.css';

function App() {
  return (
    <Routes>
      <Route path={APP_ROUTES.tracks} element={<TracksPage />} />
      <Route path='*' element={<Navigate to={APP_ROUTES.tracks} />} />
    </Routes>
  );
}

export default App;
