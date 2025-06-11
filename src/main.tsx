import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { SearchTextContextProvider, GenreContextProvider, QueryParamsProvider } from '@/contexts/contexts';

import './index.css';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('#root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryParamsProvider>
          <SearchTextContextProvider>
            <GenreContextProvider>
              <App />
            </GenreContextProvider>
          </SearchTextContextProvider>
        </QueryParamsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
