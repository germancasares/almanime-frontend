import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { test } from 'vitest';
import Edit from '.';

test('renders without crashing', () => {
  const queryClient = new QueryClient();

  render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <Edit />
      </QueryClientProvider>
    </Router>,
  );
});
