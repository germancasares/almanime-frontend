import { Dialogue } from 'lib/ssa-utils/SSASubtitle';

import './line.scss';

const Line = ({ dialogue }: { dialogue: Dialogue }) => {
  const { Text } = dialogue;
  return (
    <div className="line">
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
    </div>
  );
};

export default Line;
