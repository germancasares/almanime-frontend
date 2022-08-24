import { useRef } from 'react';

import Player from 'components/player/player';

import './index.scss';

const Build = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div id="subtitle-build">
      <div className="video-editor-wrapper">
        <div className="editor-wrapper" />
        <div className="video-wrapper">
          <Player
            videoRef={videoRef}
            playerOptions={{
              controls: true,
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
      <div className="waveform-wrapper" />
    </div>
  );
};

export default Build;
