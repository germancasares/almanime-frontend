import { createRoot } from 'react-dom/client';
import Theme from 'enums/Theme';
import ThemeSwitch from './themeSwitch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <ThemeSwitch
      theme={Theme.Light}
      toggleTheme={() => {}}
    />,
  );
});
