import { createRoot } from 'react-dom/client';
import Loader from './loader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Loader />);
});