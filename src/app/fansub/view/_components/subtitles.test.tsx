import { createRoot } from 'react-dom/client';
import Subtitles from './subtitles';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(<Subtitles />);
});