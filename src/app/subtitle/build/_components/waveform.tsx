import { RefObject, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

export type WaveFormProps = {
  mediaElement: RefObject<HTMLMediaElement>,
};

const WaveForm = ({
  mediaElement,
}: WaveFormProps) => {
  const waveformRef = useRef<HTMLDivElement | null >(null);
  const waveSurferRef = useRef<WaveSurfer | null >(null);

  useEffect(() => {
    if (!waveSurferRef.current) {
      if (!waveformRef.current) return;

      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        // progressColor: '#931a25',
        waveColor: '#5d737e',
        backend: 'MediaElement',
        fillParent: true,

        // responsive: true,
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (mediaElement.current) {
        waveSurferRef.current.load(mediaElement.current);
      }
    }
  }, [mediaElement]);

  return (
    <div ref={waveformRef} className="waveform-wrapper" />
  );
};

export default WaveForm;
