import { RefObject, useEffect, useState } from 'react';
import { CompiledASS, DialogueSlice } from 'ass-compiler';

import Line from './line';

import './editor.scss';

// slices are created splitting by \r
// fragments are created splitting by {someting}
// \n is replaced with \\N
const textToSlice = (text: string) => {
  const slice: DialogueSlice = {
    style: 'Default',
    fragments: [
      {
        tag: {},
        text: text.replaceAll('\n', '\\N'),
      },
    ],
  };

  return slice;
};

const Editor = ({
  subtitle,
  videoRef,
  updateSlices,
}: {
  subtitle: CompiledASS,
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
    <div className="editor">
      {
        subtitle.dialogues.map((dialogue, index) => (
          <Line
            key={`${dialogue.start}${dialogue.end}${dialogue.slices}`}
            dialogue={dialogue}
            currentTime={currentTime ?? 0}
            onClick={({ currentTarget }) => {
              currentTarget.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
              if (!videoRef.current) return;
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

export default Editor;
