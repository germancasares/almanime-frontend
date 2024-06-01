import { render } from '@testing-library/react';
import { CompiledASS, ScriptInfo } from 'ass-compiler';
import { RefObject } from 'react';
import { test } from 'vitest';
import Lines from './lines';

test('renders without crashing', () => {
  render(
    <Lines
      subtitle={{
        dialogues: [], 
        info: {} as ScriptInfo, 
        width: 0,
        height: 0,
        collisions: "Normal",
        styles: {},
      } as CompiledASS}
      videoRef={{ current: null } as RefObject<HTMLVideoElement>}
      updateSlices={() => {}}
    />,
  );
});
