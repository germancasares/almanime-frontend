import { createRoot } from 'react-dom/client';

import Tabs, { TabName } from './tabs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Tabs
      activeTab={TabName.Newest}
      changeTab={() => {}}
    />,
  );
});
