import { createRoot } from 'react-dom/client';
import { act } from '@testing-library/react';

import Loader from './loader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  act(() => root.render(<Loader />));
});
