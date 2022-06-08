import { createRoot } from 'react-dom/client';
import Video from './video';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Video 
      options={{}}
    />,
  );
});