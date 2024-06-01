import { render } from '@testing-library/react';
import { RefObject } from 'react';
import { test } from 'vitest';
import WaveForm from './waveform';

test('renders without crashing', () => {
  render(
    <WaveForm
      isNewSubtitle={false}
      videoRef={{ current: null } as RefObject<HTMLVideoElement>}
      subtitle={undefined}
      updateTime={() => {}}
    />,
  );
});
