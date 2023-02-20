import { RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import { CompiledASS } from 'ass-compiler';

import Lines from './lines';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Lines
      subtitle={{} as CompiledASS}
      videoRef={{ current: null } as RefObject<HTMLVideoElement>}
      updateSlices={() => {}}
    />,
  );
});
