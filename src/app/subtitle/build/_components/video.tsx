import { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

import 'video.js/dist/video-js.css';

const Video = ({
  options,
}: {
  options: VideoJsPlayerOptions,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, {
        ...options,
        plugins: {
          ass: {
            // eslint-disable-next-line max-len
            src: 'http://127.0.0.1:10000/devstoreaccount1/almanime/fansub/5e273375-0a0e-41fc-6160-08d9d6203ff1/subtitles/c1068ad8-77cc-47a8-8413-27365b10dc9d.ass',
          },
        },
      });
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => () => {
    const player = playerRef.current;
    if (player) {
      player.dispose();
      playerRef.current = null;
    }
  }, [playerRef]);

  return (
    <div data-vjs-player>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default Video;
