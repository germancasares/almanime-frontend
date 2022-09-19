import { RefObject, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

import Helper from 'app/helper';
import Theme from 'enums/Theme';

import './waveform.scss';

export type WaveFormProps = {
  videoRef: RefObject<HTMLMediaElement>,
};

const WaveForm = ({
  videoRef,
}: WaveFormProps) => {
  const waveformRef = useRef<HTMLDivElement | null >(null);
  const waveSurferRef = useRef<WaveSurfer | null >(null);

  useEffect(() => {
    if (!waveSurferRef.current) {
      if (!waveformRef.current) return;
      const initialLocalTheme = Helper.LocalStorage.Get<Theme>('theme');
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#8e8f96',
        barHeight: 0.75,
        // TODO: Find a better way of using palette
        progressColor: initialLocalTheme === Theme.Light ? '#ffc107' : '#005d78',
        // waveColor: '#40424f',
        backend: 'MediaElement',
        fillParent: true,
        responsive: true,
      });

      waveSurferRef.current.zoom(50);
    }

    if (videoRef.current && waveSurferRef.current) {
      waveSurferRef.current.load(videoRef.current);
    }
  }, [videoRef]);

  const localTheme = Helper.LocalStorage.Get<Theme>('theme');
  useEffect(() => {
    if (!waveSurferRef.current) return;

    // TODO: Find a better way of using palette
    waveSurferRef.current.setProgressColor(localTheme === Theme.Light ? '#ffc107' : '#005d78');
  }, [localTheme]);

  return (
    <div
      ref={waveformRef}
      className="waveform"
    />
  );
};

export default WaveForm;
