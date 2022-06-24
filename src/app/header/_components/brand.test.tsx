import { createRoot } from 'react-dom/client';

import Theme from 'enums/Theme';

import Brand from './brand';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Brand
      isOpen={false}
      onClick={() => {}}
      theme={Theme.Light}
      toggleTheme={() => {}}
    />,
  );
});
