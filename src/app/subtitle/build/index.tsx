import { useCallback, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import {
  compile,
  CompiledASS,
  decompile,
  DialogueSlice,
} from 'ass-compiler';

import Player from 'app/subtitle/build/_components/player';

import Editor from './_components/editor';
import WaveForm from './_components/waveform';

import './index.scss';

const Build = () => {
  const videoUrl = '/SaikiKusuonoPsiNan-01.mp4';
  // const url = '/OuterScienceSubs.ass';
  const subtitleUrl = '/SaikiKusuonoPsiNan-01.ass';
  // const url = '/SaikiKusuonoPsiNan-01.srt';

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setReady] = useState(false);
  const [subtitle, setSubtitle] = useState<CompiledASS | undefined>(undefined);

  const updateSlices = useCallback((slices: DialogueSlice[], dialogueIndex: number) => {
    setSubtitle((currentSubtitle) => {
      if (!currentSubtitle) return currentSubtitle;

      return {
        ...currentSubtitle,
        dialogues: currentSubtitle.dialogues.map((dialogue, index) => {
          if (index === dialogueIndex) {
            return {
              ...dialogue,
              slices,
            };
          }

          return dialogue;
        }),
      };
    });
  }, []);

  const updateTime = useCallback((dialogueIndex: number, start: number, end: number) => {
    setSubtitle((currentSubtitle) => {
      if (!currentSubtitle) return currentSubtitle;

      return {
        ...currentSubtitle,
        dialogues: currentSubtitle.dialogues.map((dialogue, index) => {
          if (index !== dialogueIndex) return dialogue;

          return {
            ...dialogue,
            start,
            end,
          };
        }),
      };
    });
  }, []);

  useQuery<CompiledASS>(
    ['subtitle', subtitleUrl],
    async () => compile(await (await fetch(subtitleUrl)).text(), { }),
    {
      enabled: !!subtitleUrl,
      onSuccess: (data) => {
        if (!subtitle) {
          setSubtitle(data);
        }
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  if (!subtitle) {
    return null;
  }

  return (
    <div id="subtitle-build">
      <div className="video-editor-wrapper">
        <div className="editor-wrapper">
          <Editor
            subtitle={subtitle}
            videoRef={videoRef}
            updateSlices={updateSlices}
          />
        </div>
        <div className="video-wrapper">
          <Player
            videoRef={videoRef}
            subtitle={decompile(subtitle)}
            onReady={() => setReady(true)}
            playerOptions={{
              controls: true,
              fill: true,
              // fluid: true,
              responsive: true,
              sources: [{
                src: videoUrl,
                type: 'video/mp4',
              }],
            }}
            subtitleOptions={{
              // subUrl: '/OuterScienceSubs.ass',
              // subContent: decompile(subtitle),
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
            <WaveForm
              videoRef={videoRef}
              subtitle={subtitle}
              updateTime={updateTime}
            />
          </div>
        )
      }
    </div>
  );
};

export default Build;
