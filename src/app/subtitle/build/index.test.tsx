import { createRoot } from 'react-dom/client';
import Build from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Build />);
});
