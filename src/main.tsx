import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import { TrackContextProvider } from '@/contexts/contexts.ts';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TrackContextProvider>
        <App />
      </TrackContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
