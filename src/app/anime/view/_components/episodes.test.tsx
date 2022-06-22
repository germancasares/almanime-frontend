import { createRoot } from 'react-dom/client';
import Episodes from './episodes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Episodes
      episodes={[]}
      episodeFansubs={{}}
    />,
  );
});
