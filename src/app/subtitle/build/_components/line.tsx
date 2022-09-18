import { useMemo } from 'react';
import { Dialogue } from 'ass-compiler';

import './line.scss';

const Line = ({
  dialogue,
  currentTime,
  onClick,
}: {
  dialogue: Dialogue,
  currentTime: number,
  onClick: () => void,
}) => {
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

  return (
    <div
      role="button"
      tabIndex={0}
      className={`line${(isAfterStart && isBeforeEnd) ? ' active' : ''}`}
      onClick={onClick}
      onKeyUp={() => {}}
    >
      <div className="card-content">
        <div className="content">
          {text}
        </div>
      </div>
      {/* <footer className="card-footer">
          <a href="#" className="card-footer-item">Save</a>
          <a href="#" className="card-footer-item">Edit</a>
          <a href="#" className="card-footer-item">Delete</a>
        </footer> */}
    </div>
  );
};

export default Line;
