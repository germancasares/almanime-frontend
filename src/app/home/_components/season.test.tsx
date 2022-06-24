import { createRoot } from 'react-dom/client';

import Season from 'enums/Season';

import SeasonPage from './season';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <SeasonPage
      year={2022}
      season={Season.Summer}
    />,
  );
});
