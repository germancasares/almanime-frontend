import { RefObject, useEffect, useState } from 'react';
import { CompiledASS, DialogueSlice } from 'ass-compiler';

import Line from './line';
import { textToSlice } from './utils';

import './lines.scss';

const Lines = ({
  subtitle,
  videoRef,
  updateSlices,
}: {
  subtitle?: CompiledASS,
  videoRef: RefObject<HTMLVideoElement>,
  updateSlices: (slices: DialogueSlice[], dialogueIndex: number) => void,
}) => {
  const [currentTime, setCurrentTime] = useState(videoRef.current?.currentTime);

  useEffect(() => {
    if (!videoRef.current) return;

    // eslint-disable-next-line no-param-reassign
    videoRef.current.ontimeupdate = () => {
      setCurrentTime(videoRef.current?.currentTime);
    };
  }, [videoRef]);

  return (
    <div id="lines">
      {
        subtitle?.dialogues.map((dialogue, index) => (
          <Line
            key={`${dialogue.layer}-${dialogue.start}-${dialogue.end}-${JSON.stringify(dialogue.margin)}`}
            dialogue={dialogue}
            currentTime={currentTime ?? 0}
            onClick={({ currentTarget }) => {
              currentTarget.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
              if (!videoRef.current) { return; }
              // eslint-disable-next-line no-param-reassign
              videoRef.current.currentTime = dialogue.start;
              setCurrentTime(dialogue.start);
            }}
            onChange={({ target: { value } }) => updateSlices([textToSlice(value)], index)}
          />
        ))
      }
    </div>
  );
};

export default Lines;
