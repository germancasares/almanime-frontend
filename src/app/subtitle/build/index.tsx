import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { compile, CompiledASS, decompile } from 'ass-compiler';

import Player from 'app/subtitle/build/_components/player';

import Editor from './_components/editor';
import WaveForm from './_components/waveform';

import './index.scss';

const Build = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setReady] = useState(false);
  const url = '/OuterScienceSubs.ass';

  const subContent = useQuery<CompiledASS>(
    ['subtitle', url],
    async () => compile(await (await fetch(url)).text(), { }),
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
              subContent: decompile(subContent.data),
              fonts: [
                'https://fonts.cdnfonts.com/css/gisha',
                'https://fonts.cdnfonts.com/css/aharoni',
              ],
              lossyRender: true,
            }}
          />
        </div>
      </div>
      {
        isReady && (
          <div className="waveform-wrapper">
            <WaveForm videoRef={videoRef} />
          </div>
        )
      }
    </div>
  );
};

export default Build;
