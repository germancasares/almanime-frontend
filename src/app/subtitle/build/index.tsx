import Player from 'components/player/player';

import WaveForm from './_components/waveform';

const Build = () => (
  <>
    Hello world
    <Video options={{
      autoplay: true,
      controls: true,
      sources: [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      }],
    }}
    />
  </>
);

export default Build;
