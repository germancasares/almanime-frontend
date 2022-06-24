import { createRoot } from 'react-dom/client';

import List from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<List />);
});
