import { RefObject, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

import Helper from 'app/helper';
import Theme from 'enums/Theme';

import './waveform.scss';

export type WaveFormProps = {
  mediaElement: RefObject<HTMLMediaElement>,
};

const WaveForm = ({
  mediaElement,
}: WaveFormProps) => {
  const waveformRef = useRef<HTMLDivElement | null >(null);
  const waveSurferRef = useRef<WaveSurfer | null >(null);
  const localTheme = Helper.LocalStorage.Get<Theme>('theme');

  useEffect(() => {
    if (!waveSurferRef.current) {
      if (!waveformRef.current) return;

      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        progressColor: '#8e8f96',
        barHeight: 0.75,
        // progressColor: '#931a25',
        // TODO: Find a better way of using palette
        // waveColor: localTheme === Theme.Light ? '#ffc107' : '#005d78',
        waveColor: '#40424f',
        backend: 'MediaElement',
        fillParent: true,

        // responsive: true,
      });

      waveSurferRef.current.zoom(1000);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (mediaElement.current) {
        waveSurferRef.current.load(mediaElement.current);
      }

      // TODO: Find a better way of using palette
      // waveSurferRef.current.setWaveColor(localTheme === Theme.Light ? '#ffc107' : '#005d78');
    }
  }, [localTheme, mediaElement]);

  return (
    <>
      <div className="grid" />
      <div
        ref={waveformRef}
        className="waveform"
      />
    </>
  );
};

export default WaveForm;
