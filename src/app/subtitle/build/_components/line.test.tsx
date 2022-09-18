import { createRoot } from 'react-dom/client';

import Line from './line';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Line
      dialogue={{
        layer: 0,
        start: 0,
        end: 0,
        style: '',
        name: '',
        alignment: 0,
        slices: [],
        clip: undefined,
        effect: undefined,
        fade: undefined,
        move: undefined,
        org: undefined,
        pos: undefined,
        margin: {
          left: 0,
          right: 0,
          vertical: 0,
        },
      }}
      currentTime={0}
      onClick={() => {}}
    />,
  );
});
