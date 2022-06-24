import { createRoot } from 'react-dom/client';

import Brand from './brand';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Brand />);
});
