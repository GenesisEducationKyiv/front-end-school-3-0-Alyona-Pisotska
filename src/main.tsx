import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';

import App from './App';
import { ErrorComponent } from '@/Components/components';
import { SearchTextContextProvider, GenreContextProvider, QueryParamsProvider } from '@/contexts/contexts';

import '@/integrations/sentry';
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
        <Sentry.ErrorBoundary fallback={<ErrorComponent />}>
          <QueryParamsProvider>
            <SearchTextContextProvider>
              <GenreContextProvider>
                <App />
              </GenreContextProvider>
            </SearchTextContextProvider>
          </QueryParamsProvider>
        </Sentry.ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
