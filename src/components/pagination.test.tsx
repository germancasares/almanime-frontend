import { createRoot } from 'react-dom/client';
import Pagination from './pagination';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Pagination
      total={10}
      perPage={2}
      current={5}
      steps={3}
      onChange={() => {}}
    />,
  );
});
