// eslint-disable-next-line simple-import-sort/imports
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';

import Player from 'app/subtitle/build/_components/player';
import ssaParser from 'lib/ssa-utils/parser';
import SSASubtitle from 'lib/ssa-utils/SSASubtitle';

import WaveForm from './_components/waveform';
import Editor from './_components/editor';

import './index.scss';

const Build = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const url = '/OuterScienceSubs.ass';

  const subContent = useQuery<SSASubtitle>(
    ['subtitle', url],
    async () => ssaParser(await (await fetch(url)).text()),
    {
      enabled: !!url,
    },
  );

  if (!subContent.data) {
    return null;
  }

  return (
    <div id="subtitle-build">
      <div className="video-editor-wrapper">
        <div className="editor-wrapper">
          <Editor
            subtitle={subContent.data}
            videoRef={videoRef}
          />
        </div>
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
              subContent: subContent.data.toString(),
              fonts: [
                'http://fonts.cdnfonts.com/css/gisha',
                'http://fonts.cdnfonts.com/css/aharoni',
              ],
            }}
          />
        </div>
      </div>
      {
        isReady && (
          <div className="waveform-wrapper">
            <WaveForm mediaElement={videoRef} />
          </div>
        )
      }
    </div>
  );
};

export default Build;
