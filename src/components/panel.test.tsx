import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import Panel from './panel';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Router>
      <Panel
        name="Test"
        to="/"
        star={{
          shouldShow: false,
          isSelected: false,
          onClick: () => {},
        }}
      />
    </Router>,
  );
});
