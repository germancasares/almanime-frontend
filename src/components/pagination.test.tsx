import { createRoot } from 'react-dom/client';
import { act } from '@testing-library/react';

import Pagination from './pagination';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  act(() => root.render(
    <Pagination
      total={10}
      perPage={2}
      current={5}
      steps={3}
      onChange={() => {}}
    />,
  ));
});
