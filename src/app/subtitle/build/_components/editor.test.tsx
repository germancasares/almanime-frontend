import { RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import { CompiledASS } from 'ass-compiler';

import Editor from './editor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Editor
      subtitle={{} as CompiledASS}
      videoRef={{ current: null } as RefObject<HTMLVideoElement>}
    />,
  );
});
