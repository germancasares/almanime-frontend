import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from '@testing-library/react';

import Create from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  const queryClient = new QueryClient();

  act(() => root.render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <Create />
      </QueryClientProvider>
    </Router>,
  ));
});
