import {
  RefObject, useEffect, useRef, useState,
} from 'react';
import { CompiledASS } from 'ass-compiler';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';

import Helper from 'app/helper';
import Theme from 'enums/Theme';

import { gatherRegions } from './utils';

import './waveform.scss';

export type WaveFormProps = {
  isNewSubtitle: boolean,
  videoRef: RefObject<HTMLMediaElement>,
  subtitle?: CompiledASS,
  updateTime: (index: number, start: number, end: number) => void
};

const WaveForm = ({
  isNewSubtitle,
  videoRef,
  subtitle,
  updateTime,
}: WaveFormProps) => {
  const waveformRef = useRef<HTMLDivElement | null >(null);
  const waveSurferRef = useRef<WaveSurfer | null >(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (!waveSurferRef.current) {
      if (!waveformRef.current) return;
      const initialLocalTheme = Helper.LocalStorage.Get<Theme>('theme');

      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#8e8f96',
        barHeight: 0.75,
        cursorWidth: 2,
        cursorColor: '#ff6961',
        // TODO: Find a better way of using palette
        progressColor: initialLocalTheme === Theme.Light ? '#ffc107' : '#005d78',
        backend: 'MediaElement',
        responsive: true,
        plugins: [
          RegionsPlugin.create({
            regions: gatherRegions(subtitle),
          }),
        ],
      });

      waveSurferRef.current.zoom(zoom);
      waveSurferRef.current.on('region-update-end', ({ data, start, end }) => updateTime(data.index, start, end));
    }

    if (waveSurferRef.current && videoRef.current) {
      waveSurferRef.current.load(videoRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  useEffect(() => {
    if (waveSurferRef.current && subtitle && isNewSubtitle) {
      console.debug('New regions');
      waveSurferRef.current.destroyPlugin('regions');
      waveSurferRef.current.registerPlugins([
        RegionsPlugin.create({
          regions: gatherRegions(subtitle),
        }),
      ]);
    }
  }, [isNewSubtitle, subtitle]);

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
      onWheel={(event) => {
        if (!waveSurferRef.current) return;
        const newZoom = Math.max(zoom + Math.sign(event.deltaY) * -50, 50);
        if (newZoom !== zoom) {
          waveSurferRef.current.zoom(newZoom);
          setZoom(newZoom);
        }
      }}
    />
  );
};

export default WaveForm;
