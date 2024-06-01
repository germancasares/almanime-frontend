import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { test } from 'vitest';
import Menu from './menu';

test('renders without crashing', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Menu
        subtitle={undefined}
        setIsStylesActive={() => {}}
      />
    </QueryClientProvider>
  );
});
