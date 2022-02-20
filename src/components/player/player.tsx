import { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';

import SubtitlesOctopus, { Options } from 'libass-wasm';

export type PlayerProps = {
  playerOptions: VideoJsPlayerOptions,
  subtitleOptions?: Options,
  onReady?: (player: VideoJsPlayer) => void,
};

const Player  = ({ 
  playerOptions, 
  subtitleOptions,
  onReady, 
}: PlayerProps ) => {
  const videoRef = useRef(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const subtitleRef = useRef<SubtitlesOctopus | null>(null);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, playerOptions, () => {
        console.log('player is ready');
        onReady && onReady(player);

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
      });
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [onReady, playerOptions, subtitleOptions, videoRef]);

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

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-theme-forest" />
    </div>
  );
};

export default Player;
