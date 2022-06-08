import { createRoot } from 'react-dom/client';
import SeasonPage from './season';

import Season from 'enums/Season';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <SeasonPage
      year={2022}
      season={Season.Summer}
    />,
  );
});