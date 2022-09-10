import SSASubtitle from 'lib/ssa-utils/SSASubtitle';

import Line from './line';

import './editor.scss';

const Editor = ({
  subtitle,
}: {
  subtitle: SSASubtitle
}) => (
  <div className="editor">
    {
      subtitle.Events.map((dialogue) => (
        <Line dialogue={dialogue} />
      ))
    }
  </div>
);
export default Editor;
