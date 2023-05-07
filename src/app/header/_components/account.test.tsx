import { createRoot } from 'react-dom/client';

import Account from './account';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Account toggleBurger={() => {}} />);
});
