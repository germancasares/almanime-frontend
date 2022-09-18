import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

import List from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  const queryClient = new QueryClient();
  fetchMock.mockResponseOnce(JSON.stringify([]));

  act(() => root.render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <List />
      </QueryClientProvider>
    </Router>,
  ));
});
