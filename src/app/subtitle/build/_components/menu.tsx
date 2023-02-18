import { useState } from 'react';
import {
  mdiSubtitles,
  mdiSubtitlesOutline,
  mdiVideo,
  mdiVideoOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import {
  compile,
  CompiledASS,
} from 'ass-compiler';

import './menu.scss';

const Menu = ({
  setSubtitle,
  setVideoSource,
}: {
  setSubtitle: (subtitle: CompiledASS) => void,
  setVideoSource: React.Dispatch<React.SetStateAction<{
    src: string;
    type: string;
  } | undefined>>,
}) => {
  const [activeIcon, setActiveIcon] = useState('');
  return (
    <div id="menu">
      <div className="file is-boxed">
        <label className="file-label" htmlFor="set-subtitle">
          <input
            id="set-subtitle"
            className="file-input"
            type="file"
            name="subtitle"
            onChange={async ({ target: { files } }) => files && setSubtitle(compile(await files[0].text(), {}))}
          />
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span
            className="file-cta"
            onMouseDown={() => setActiveIcon('mdiFileUpload')}
            onMouseUp={() => setActiveIcon('')}
            onBlur={() => setActiveIcon('')}
            onMouseOut={() => setActiveIcon('')}
          >
            <span className="file-icon">
              <Icon
                path={activeIcon === 'mdiFileUpload' ? mdiSubtitlesOutline : mdiSubtitles}
                size={1}
              />
            </span>
          </span>
        </label>
      </div>

      <div className="file is-boxed">
        <label className="file-label" htmlFor="set-video">
          <input
            id="set-video"
            className="file-input"
            type="file"
            name="video"
            accept="video/*"
            onChange={
              async ({ target: { files } }) => files && setVideoSource({
                type: files[0].type,
                src: URL.createObjectURL(files[0]),
              })
            }
          />
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span
            className="file-cta"
            onMouseDown={() => setActiveIcon('mdiFileUpload')}
            onMouseUp={() => setActiveIcon('')}
            onBlur={() => setActiveIcon('')}
            onMouseOut={() => setActiveIcon('')}
          >
            <span className="file-icon">
              <Icon
                path={activeIcon === 'mdiFileUpload' ? mdiVideoOutline : mdiVideo}
                size={1}
              />
            </span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default Menu;
