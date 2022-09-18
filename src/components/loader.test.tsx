import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import Loader from './loader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  act(() => root.render(<Loader />));
});
