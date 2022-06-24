import { createRoot } from 'react-dom/client';

import Footer from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Footer />);
});
