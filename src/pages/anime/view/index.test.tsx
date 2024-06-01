import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { test } from 'vitest';
import View from '.';

test('renders without crashing', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <View />
    </QueryClientProvider>
  );
});
