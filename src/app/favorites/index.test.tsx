import { createRoot } from 'react-dom/client';
import Favorites from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Favorites />);
});