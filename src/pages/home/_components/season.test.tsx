import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { test } from 'vitest';
import Season from '../../../enums/Season';
import SeasonPage from './season';

test('renders without crashing', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <SeasonPage
        year={2022}
        season={Season.Summer}
      />
    </QueryClientProvider>
  );
});
