import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import {
  TrackContextProvider,
  SearchTextContextProvider,
  GenreContextProvider,
  QueryParamsProvider,
} from '@/contexts/contexts.ts';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryParamsProvider>
          <SearchTextContextProvider>
            <GenreContextProvider>
              <TrackContextProvider>
                <App />
              </TrackContextProvider>
            </GenreContextProvider>
          </SearchTextContextProvider>
        </QueryParamsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
