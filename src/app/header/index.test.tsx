import { createRoot } from 'react-dom/client';

import Theme from 'enums/Theme';

import Header from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Header
      theme={Theme.Light}
      toggleTheme={() => {}}
    />,
  );
});
