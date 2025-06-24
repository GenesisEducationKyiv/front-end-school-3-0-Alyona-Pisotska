import '../src/index.css';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryParamsProvider, SearchTextContextProvider, GenreContextProvider } from '@/contexts/contexts';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/require-await
beforeMount(async ({ App }) => {
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <QueryParamsProvider>
          <SearchTextContextProvider>
            <GenreContextProvider>
              <App />
            </GenreContextProvider>
          </SearchTextContextProvider>
        </QueryParamsProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
});
