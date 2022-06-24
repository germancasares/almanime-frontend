import { createRoot } from 'react-dom/client';

import { Error, Success } from './help';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Error message="Test" />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Success message="Test" />);
});
