import { RefObject, useEffect, useState } from 'react';
import { CompiledASS } from 'ass-compiler';

import Line from './line';

import './editor.scss';

const Editor = ({
  subtitle,
  videoRef,
}: {
  subtitle: CompiledASS,
  videoRef: RefObject<HTMLVideoElement>,
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
        subtitle.dialogues.map((dialogue) => (
          <Line
            key={`${dialogue.start}${dialogue.end}`}
            dialogue={dialogue}
            currentTime={currentTime ?? 0}
            onClick={() => {
              const newTime = dialogue.start;
              setCurrentTime(newTime);
              if (!videoRef.current) return;
              // eslint-disable-next-line no-param-reassign
              videoRef.current.currentTime = newTime;
            }}
          />
        ))
      }
    </div>
  );
};
export default Editor;
