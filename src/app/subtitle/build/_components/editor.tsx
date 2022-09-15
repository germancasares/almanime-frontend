import { RefObject, useEffect, useState } from 'react';
import SSASubtitle from 'lib/ssa-utils/SSASubtitle';

import Line from './line';

import './editor.scss';

const Editor = ({
  subtitle,
  videoRef,
}: {
  subtitle: SSASubtitle,
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
        subtitle.Events.map((dialogue) => (
          <Line
            dialogue={dialogue}
            currentTime={currentTime ?? 0}
            onClick={() => console.log('Hola')}
          />
        ))
      }
    </div>
  );
};
export default Editor;
