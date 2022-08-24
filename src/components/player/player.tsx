import { RefObject, useEffect, useRef } from 'react';
import SubtitlesOctopus, { Options } from 'libass-wasm';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';

export type PlayerProps = {
  videoRef: RefObject<HTMLVideoElement>,
  playerOptions: VideoJsPlayerOptions,
  subtitleOptions?: Options,
  onReady?: (player: VideoJsPlayer) => void,
};

const Player = ({
  videoRef,
  playerOptions,
  subtitleOptions,
  onReady,
}: PlayerProps) => {
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const subtitleRef = useRef<SubtitlesOctopus | null>(null);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = videojs(videoElement, playerOptions, () => {
        if (subtitleOptions) {
          if (!subtitleRef.current) {
            subtitleRef.current = new SubtitlesOctopus({
              ...subtitleOptions,
              workerUrl: '/scripts/subtitles-octopus-worker.js',
              video: videoElement,
            });
          } else {
            // Modify current instance of subtitleRef
          }
        }

        onReady && onReady(player);
      });
      playerRef.current = player;
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [onReady, playerOptions, subtitleOptions, videoRef]);

  return (
    <div data-vjs-player>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} className="video-js vjs-theme-forest" />
    </div>
  );
};

export default Player;
