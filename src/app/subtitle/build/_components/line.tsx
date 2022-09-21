import { MouseEvent, useMemo, useRef } from 'react';
import { Dialogue } from 'ass-compiler';

import './line.scss';

const Line = ({
  dialogue,
  currentTime,
  onClick,
}: {
  dialogue: Dialogue,
  currentTime: number,
  onClick: (event: MouseEvent<HTMLDivElement>) => void,
}) => {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const { start, end } = dialogue;
  const isAfterStart = start <= (currentTime ?? 0);
  const isBeforeEnd = end > (currentTime ?? 0);
  const text = useMemo(() => dialogue.slices.reduce(
    (line, slice) => line + slice.fragments.reduce(
      (subline, frag) => subline + frag.text,
      '',
    ),
    '',
  ), [dialogue.slices]);

  if (lineRef.current && isAfterStart && isBeforeEnd) {
    lineRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  return (
    <div
      ref={lineRef}
      role="button"
      tabIndex={0}
      className={`line${(isAfterStart && isBeforeEnd) ? ' active' : ''}`}
      onClick={onClick}
      onKeyUp={() => {}}
    >
      <div className="card-content">
        <div className="content">
          {text.replaceAll('\\N', '\n')}
        </div>
      </div>
    </div>
  );
};

export default Line;
