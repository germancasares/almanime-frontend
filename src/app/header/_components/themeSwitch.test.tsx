import { createRoot } from 'react-dom/client';
import ThemeSwitch from './themeSwitch';

import Theme from 'enums/Theme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <ThemeSwitch
      theme={Theme.Light}
      toggleTheme={() => {}}
    />,
  );
});