import { RefObject } from 'react';
import { createRoot } from 'react-dom/client';

import WaveForm from './waveform';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <WaveForm
      videoRef={{ current: null } as RefObject<HTMLVideoElement>}
    />,
  );
});
