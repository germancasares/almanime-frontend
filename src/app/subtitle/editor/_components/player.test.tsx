import { RefObject } from 'react';
import { createRoot } from 'react-dom/client';

import Player from './player';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Player
      videoRef={{ current: null } as RefObject<HTMLVideoElement>}
      subtitle={undefined}
      playerOptions={{}}
      onReady={() => {}}
    />,
  );
});
