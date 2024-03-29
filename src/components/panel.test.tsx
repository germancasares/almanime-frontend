import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from '@testing-library/react';

import Panel from './panel';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  act(() => root.render(
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
  ));
});
