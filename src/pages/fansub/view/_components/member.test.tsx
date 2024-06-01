import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { test } from 'vitest';
import Members from './members';

test('renders without crashing', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Members acronym="" />
    </QueryClientProvider>
  );
});
