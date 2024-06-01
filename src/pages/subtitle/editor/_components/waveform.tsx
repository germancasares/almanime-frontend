import { CompiledASS } from 'ass-compiler';
import {
  RefObject, useEffect, useMemo,
  useRef, useState,
} from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js';
import Theme from '../../../../enums/Theme';
import Helper from '../../../../helper';
import { getRegionsFromSubtitle } from './utils';
import './waveform.scss';

export type WaveFormProps = {
  isNewSubtitle: boolean,
  videoRef: RefObject<HTMLMediaElement>,
  subtitle?: CompiledASS,
  updateTime: (index: number, start: number, end: number) => void
};

const wrapperBackground = `.wrapper {
  --box-size: 10px;
background-image: 
  linear-gradient(transparent calc(var(--box-size) - 1px), var(--over-surface-2) var(--box-size), transparent var(--box-size)),
  linear-gradient(90deg, transparent calc(var(--box-size) -  1px), var(--over-surface-2) var(--box-size), transparent var(--box-size));
background-size: 100% var(--box-size), var(--box-size) 100%;
}`;

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
          TimelinePlugin.create({
            height: 16,
            timeInterval: 0.1,
            primaryLabelInterval: 1,
            style: {
              backgroundColor: 'transparent',
              position: 'absolute',
              width: '100%',
              bottom: '0',
              color: 'white',
            },
          }),
        ],
      });

      waveSurferRef.current.on('decode', () => {
        if (!waveSurferRef.current) return;
        waveSurferRef.current.zoom(zoom);
      });

      /** HACK: https://github.com/katspaugh/wavesurfer.js/discussions/3175 */
      const style = document.createElement('style');
      style.textContent = wrapperBackground;
      waveSurferRef.current.getWrapper().appendChild(style);
      /** HACK: https://github.com/katspaugh/wavesurfer.js/discussions/3175 */

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
