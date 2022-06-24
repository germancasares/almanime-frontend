import { createRoot } from 'react-dom/client';

import Search from './search';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Search />);
});
