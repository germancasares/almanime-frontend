import { createRoot } from 'react-dom/client';

import Menu from './menu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Menu
      subtitle={undefined}
      setIsStylesActive={() => {}}
    />,
  );
});
