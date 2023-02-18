import { useCallback, useRef, useState } from 'react';
import {
  CompiledASS,
  decompile,
  DialogueSlice,
} from 'ass-compiler';

import Player from 'app/subtitle/build/_components/player';

import Editor from './_components/editor';
import Menu from './_components/menu';
import WaveForm from './_components/waveform';

import './index.scss';

const Build = () => {
  const videoUrl = '/SaikiKusuonoPsiNan-01.mp4';

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setReady] = useState(false);
  const [isNewSubtitle, setIsNewSubtitle] = useState(false);
  const [subtitle, setSubtitle] = useState<CompiledASS | undefined>(undefined);

  const updateSubtitle = useCallback((newSubtitle: CompiledASS) => {
    setSubtitle(newSubtitle);
    setIsNewSubtitle(true);
  }, []);

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
    setIsNewSubtitle(false);
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
    setIsNewSubtitle(false);
  }, []);

  return (
    <div id="subtitle-build">
      <div className="video-editor-wrapper">
        <div className="menu-wrapper">
          <Menu setSubtitle={updateSubtitle} />
        </div>
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
            subtitle={subtitle ? decompile(subtitle) : undefined}
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
            }}
          />
        </div>
      </div>
      {
        isReady && (
          <div className="waveform-wrapper">
            <WaveForm
              isNewSubtitle={isNewSubtitle}
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
