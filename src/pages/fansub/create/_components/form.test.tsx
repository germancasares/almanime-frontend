import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { test } from 'vitest';
import Form from './form';

test('renders without crashing', () => {
  const queryClient = new QueryClient();

  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Form />
      </QueryClientProvider>
    </BrowserRouter>
  );
});
