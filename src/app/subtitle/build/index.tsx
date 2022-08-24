import { useRef, useState } from 'react';
import Player from 'components/player/player';
import WaveForm from './_components/waveform';

import './index.scss';

const Build = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setReady] = useState(false);
  return (
    <div id="subtitle-build">
      <div className="video-editor-wrapper">
        <div className="editor-wrapper" />
        <div className="video-wrapper">
          <Player
            videoRef={videoRef}
            onReady={() => setReady(true)}
            playerOptions={{
              controls: true,
              fill: true,
              // fluid: true,
              responsive: true,
              sources: [{
                src: '/OuterScienceSubs.mp4',
                type: 'video/mp4',
              }],
            }}
            subtitleOptions={{
              subUrl: '/OuterScienceSubs.ass',
              fonts: [
                'http://fonts.cdnfonts.com/css/gisha',
                'http://fonts.cdnfonts.com/css/aharoni',
              ],
            }}
          />
        </div>
      </div>
      {
        isReady && (<WaveForm mediaElement={videoRef} />)
      }
    </div>
  );
};

export default Build;
