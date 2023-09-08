import {
  RefObject, useEffect, useMemo,
  useRef, useState,
} from 'react';
import { CompiledASS } from 'ass-compiler';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions';

import Helper from 'app/helper';
import Theme from 'enums/Theme';

import { getRegionsFromSubtitle } from './utils';

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
  const containerRef = useRef<HTMLDivElement | null >(null);
  const waveSurferRef = useRef<WaveSurfer | null >(null);
  const regionsRef = useRef<RegionsPlugin | null>(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (!waveSurferRef.current) {
      if (!containerRef.current || !videoRef.current) return;
      const initialLocalTheme = Helper.LocalStorage.Get<Theme>('theme');

      regionsRef.current = RegionsPlugin.create();

      waveSurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: '#8e8f96',
        barHeight: 0.75,
        height: 'auto',
        autoScroll: true,
        autoCenter: true,
        cursorWidth: 2,
        cursorColor: '#ff6961',
        media: videoRef.current,
        // TODO: Find a better way of using palette
        progressColor: initialLocalTheme === Theme.Light ? '#ffc107' : '#005d78',
        plugins: [
          regionsRef.current,
        ],
      });

      waveSurferRef.current.on('decode', () => {
        if (!waveSurferRef.current) return;
        waveSurferRef.current.zoom(zoom);
      });

      regionsRef.current.on('region-updated', ({ id, start, end }) => updateTime(parseInt(id, 10), start, end));

      if (subtitle) {
        getRegionsFromSubtitle(subtitle).forEach((region) => regionsRef.current?.addRegion(region));
      }
    }

    if (waveSurferRef.current && videoRef.current) {
      waveSurferRef.current.setOptions({
        media: videoRef.current,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  useMemo(() => {
    if (waveSurferRef.current && subtitle && isNewSubtitle) {
      regionsRef.current?.clearRegions();
      getRegionsFromSubtitle(subtitle).forEach((region) => regionsRef.current?.addRegion(region));
    }
  }, [isNewSubtitle, subtitle]);

  const localTheme = Helper.LocalStorage.Get<Theme>('theme');
  useMemo(() => {
    if (!waveSurferRef.current) return;

    // TODO: Find a better way of using palette
    waveSurferRef.current.setOptions({ progressColor: localTheme === Theme.Light ? '#ffc107' : '#005d78' });
  }, [localTheme]);

  return (
    <div
      ref={containerRef}
      className="waveform"
      onWheel={(event) => {
        if (!waveSurferRef.current) return;
        const newZoom = Math.max(zoom + Math.sign(event.deltaY) * -50, 1);
        if (newZoom !== zoom) {
          waveSurferRef.current.zoom(newZoom);
          setZoom(newZoom);
        }
      }}
    />
  );
};

export default WaveForm;
