import {
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { CompiledASS, decompile } from 'ass-compiler';
import SubtitlesOctopus, { OptionsWithSubContent, OptionsWithSubUrl } from 'libass-wasm';
import videojs from 'video.js';
import VideoJsPlayer from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';
import { VideoJsPlayerOptions } from '../../../../types/typescript/videojs-options';

export type PlayerProps = {
  videoRef: RefObject<HTMLVideoElement>,
  subtitle?: CompiledASS | undefined,
  videoSource?: { src: string, type: string },
  playerOptions: VideoJsPlayerOptions,
  subtitleOptions?: OptionsWithSubContent | OptionsWithSubUrl,
  onReady?: (player: VideoJsPlayer) => void,
};

const Player = ({
  videoRef,
  subtitle,
  videoSource,
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
      if (!videoRef.current || !videoSource) return;

      const player = videojs(
        videoRef.current,
        {
          controls: true,
          fill: true,
          // fluid: true,
          responsive: true,
          sources: [videoSource],
          ...playerOptions,
        },
        () => {
          if (!subtitleRef.current && videoRef.current) {
            subtitleRef.current = new SubtitlesOctopus({
              ...subtitleOptions,
              subUrl: '/empty-subtitle.ass',
              workerUrl: '/scripts/subtitles-octopus-worker.js',
              video: videoRef.current,
              lossyRender: true,
            });
            if (subtitleRef.current && subtitle) {
              subtitleRef.current.setTrack(decompile(subtitle));
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onReady && onReady(player);
        },
      );
      player.muted(true);
      playerRef.current = player;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReady, playerOptions, subtitle, videoRef, videoSource]);

  useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current.src(videoSource);
  }, [videoSource]);

  useEffect(() => {
    if (!playerRef.current) return;

    if (subtitleRef.current && subtitle) {
      subtitleRef.current.setTrack(decompile(subtitle));
    }
  }, [subtitle]);

  return (
    <div data-vjs-player>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} preload="none" className="video-js vjs-theme-forest" />
    </div>
  );
};

export default Player;
