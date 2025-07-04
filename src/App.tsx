import { Routes, Route, Navigate } from 'react-router-dom';
import TracksPage from '@/Pages/Tracks/Tracks';
import { APP_ROUTES } from './lib/constants/constants';

import './index.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to={APP_ROUTES.tracks} replace />} />
      <Route path={APP_ROUTES.tracks} element={<TracksPage />} />
      <Route path='*' element={<Navigate to={APP_ROUTES.tracks} replace />} />
    </Routes>
  );
}

export default App;
