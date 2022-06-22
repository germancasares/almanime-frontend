import { createRoot } from 'react-dom/client';
import Form from './form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Form />);
});
