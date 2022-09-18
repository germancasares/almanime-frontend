import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import { Error, Success } from './help';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  act(() => root.render(<Error message="Test" />));
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  act(() => root.render(<Success message="Test" />));
});
