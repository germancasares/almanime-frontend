import { createRoot } from 'react-dom/client';

import Editor from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Editor />);
});
