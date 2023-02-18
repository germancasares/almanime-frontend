import { createRoot } from 'react-dom/client';
import { act } from '@testing-library/react';

import Hero from './hero';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  act(() => root.render(<Hero />));
});
