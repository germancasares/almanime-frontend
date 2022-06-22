import { createRoot } from 'react-dom/client';
import Members from './members';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Members />);
});
