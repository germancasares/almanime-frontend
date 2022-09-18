import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import Settings from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  act(() => root.render(<Settings />));
});
