import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CompiledASS,
  DialogueSlice,
} from 'ass-compiler';

import Lines from './_components/lines';
import Menu from './_components/menu';
import Player from './_components/player';
import WaveForm from './_components/waveform';

import './index.scss';

const Editor = () => {
  const {
    fansubAcronym,
    animeSlug,
    episodeNumber,
  } = useParams<{
    fansubAcronym: string,
    animeSlug: string,
    episodeNumber: string,
  }>();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setReady] = useState(false);
  const [isNewSubtitle, setIsNewSubtitle] = useState(false);
  const [subtitle, setSubtitle] = useState<CompiledASS | undefined>(undefined);
  const [videoSource, setVideoSource] = useState<{ src: string, type: string } | undefined>(undefined);

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
    <div id="subtitle-editor">
      <div className="video-editor-wrapper">
        <div className="menu-wrapper">
          <Menu
            setSubtitle={updateSubtitle}
            setVideoSource={setVideoSource}
            subtitle={subtitle}
            fansubAcronym={fansubAcronym}
            animeSlug={animeSlug}
            episodeNumber={episodeNumber}
          />
        </div>
        <div className="lines-wrapper">
          <Lines
            subtitle={subtitle}
            videoRef={videoRef}
            updateSlices={updateSlices}
          />
        </div>
        <div className="video-wrapper">
          <Player
            videoRef={videoRef}
            subtitle={subtitle}
            videoSource={videoSource}
            onReady={() => setReady(true)}
            playerOptions={{}}
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

export default Editor;
