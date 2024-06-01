import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { test } from 'vitest';
import View from '.';

test('renders without crashing', () => {
  const queryClient = new QueryClient();

  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <View />
      </QueryClientProvider>
    </BrowserRouter>
  );
});
