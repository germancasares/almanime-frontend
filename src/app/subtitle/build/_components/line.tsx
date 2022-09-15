import { Dialogue } from 'lib/ssa-utils/SSASubtitle';

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
  const { Text, Start, End } = dialogue;
  const isAfterStart = Start.toMillis() / 1000 <= (currentTime ?? 0);
  const isBeforeEnd = End.toMillis() / 1000 >= (currentTime ?? 0);

  if (Text === '"What loathsome tales."') {
    console.log({
      Start: Start.toMillis() / 1000,
      End: End.toMillis() / 1000,
      currentTime,
      isAfterStart,
      isBeforeEnd,
    });
  }

  return (
    <button type="button" className={`line${(isAfterStart && isBeforeEnd) ? ' active' : ''}`} onClick={onClick}>
      <div className="card-content">
        <div className="content">
          {Text}
        </div>
      </div>
      {/* <footer className="card-footer">
          <a href="#" className="card-footer-item">Save</a>
          <a href="#" className="card-footer-item">Edit</a>
          <a href="#" className="card-footer-item">Delete</a>
        </footer> */}
    </button>
  );
};

export default Line;
