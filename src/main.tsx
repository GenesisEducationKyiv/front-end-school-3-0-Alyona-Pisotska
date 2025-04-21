import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import { TrackContextProvider, SearchTextContextProvider } from '@/contexts/contexts.ts';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchTextContextProvider>
        <TrackContextProvider>
          <App />
        </TrackContextProvider>
      </SearchTextContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
