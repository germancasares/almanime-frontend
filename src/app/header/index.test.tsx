import { createRoot } from 'react-dom/client';
import Header from './';

import Theme from 'enums/Theme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Header 
      theme={Theme.Light}
      toggleTheme={() => {}}
    />,
  );
});