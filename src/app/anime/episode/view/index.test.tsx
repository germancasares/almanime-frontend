import { createRoot } from 'react-dom/client';
import View from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<View />);
});