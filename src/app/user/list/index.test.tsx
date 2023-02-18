import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import List from '.';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const queryClient = new QueryClient();
  fetchMock.mockResponseOnce(JSON.stringify([]));

  await act(async () => {
    createRoot(div).render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <List />
        </QueryClientProvider>
      </Router>,
    );
  });
});
