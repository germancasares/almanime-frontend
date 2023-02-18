import { RefObject, useEffect, useRef } from 'react';
import SubtitlesOctopus, { OptionsWithSubContent, OptionsWithSubUrl } from 'libass-wasm';
import videojs from 'video.js';
import VideoJsPlayer from 'video.js/dist/types/player';

import { VideoJsPlayerOptions } from 'types/typescript/videojs-options';

import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';

export type PlayerProps = {
  videoRef: RefObject<HTMLVideoElement>,
  subtitle?: string,
  playerOptions: VideoJsPlayerOptions,
  subtitleOptions?: OptionsWithSubContent | OptionsWithSubUrl,
  onReady?: (player: VideoJsPlayer) => void,
};

const Player = ({
  videoRef,
  subtitle,
  playerOptions,
  subtitleOptions,
  onReady,
}: PlayerProps) => {
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const subtitleRef = useRef<SubtitlesOctopus | null>(null);

  // Dispose the Video.js player & subtitles when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }

      if (subtitleRef) {
        subtitleRef.current?.dispose();
        subtitleRef.current = null;
      }
    };
  }, [playerRef]);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      if (!videoRef.current) return;

      const player = videojs(videoRef.current, playerOptions, () => {
        if (subtitleOptions) {
          if (!subtitleRef.current && videoRef.current) {
            subtitleRef.current = new SubtitlesOctopus({
              ...subtitleOptions,
              subUrl: '/empty-subtitle.ass',
              workerUrl: '/scripts/subtitles-octopus-worker.js',
              video: videoRef.current,
              lossyRender: true,
            });

            if (subtitle) {
              subtitleRef.current.setTrack(subtitle);
            }
          } else {
            // Modify current instance of subtitleRef
          }
        }

        onReady && onReady(player);
      });
      player.muted(true);
      playerRef.current = player;
    } else {
      // eslint-disable-next-line no-lonely-if
      if (subtitleRef.current && subtitle) {
        subtitleRef.current.setTrack(subtitle);
      }
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [onReady, playerOptions, subtitleOptions, videoRef, subtitle]);

  return (
    <div data-vjs-player>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} className="video-js vjs-theme-forest" />
    </div>
  );
};

export default Player;
