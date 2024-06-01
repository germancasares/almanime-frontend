import { render } from '@testing-library/react';
import { test } from 'vitest';
import Pagination from './pagination';

test('renders without crashing', () => {
  render(
    <Pagination
      total={10}
      perPage={2}
      current={5}
      steps={3}
      onChange={() => {}}
    />,
  );
});
