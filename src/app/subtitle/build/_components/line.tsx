import {
  ChangeEvent, MouseEvent, useRef,
} from 'react';
import { Dialogue } from 'ass-compiler';

import './line.scss';

const Line = ({
  dialogue,
  currentTime,
  onClick,
  onChange,
}: {
  dialogue: Dialogue,
  currentTime: number,
  onClick: (event: MouseEvent<HTMLDivElement>) => void,
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void,
}) => {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const { start, end } = dialogue;
  const isAfterStart = start <= (currentTime ?? 0);
  const isBeforeEnd = end > (currentTime ?? 0);
  const text = dialogue.slices.reduce(
    (line, slice) => line + slice.fragments.reduce(
      (lineFragment, fragment) => lineFragment + fragment.text,
      '',
    ),
    '',
  ).replaceAll('\\N', '\n');

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
      data-replicated-value={text}
    >
      <textarea
        className="textarea"
        rows={1}
        value={text}
        onChange={onChange}
      />
    </div>
  );
};

export default Line;
