import { createRoot } from 'react-dom/client';
import Hero from './hero';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Hero />);
});