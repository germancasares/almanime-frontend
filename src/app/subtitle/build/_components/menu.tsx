import { useState } from 'react';
import { mdiFileUpload, mdiFileUploadOutline } from '@mdi/js';
import Icon from '@mdi/react';
import {
  compile,
  CompiledASS,
} from 'ass-compiler';

import './menu.scss';

const Menu = ({
  setSubtitle,
}: {
  setSubtitle: (subtitle: CompiledASS) => void,
}) => {
  const [activeIcon, setActiveIcon] = useState('');
  return (
    <div id="menu">
      <div className="file is-boxed">
        <label className="file-label" htmlFor="upload-subtitle">
          <input
            id="upload-subtitle"
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
                path={activeIcon === 'mdiFileUpload' ? mdiFileUploadOutline : mdiFileUpload}
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
