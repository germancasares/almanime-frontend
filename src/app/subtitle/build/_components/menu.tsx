import { useEffect, useState } from 'react';
import {
  mdiDownload,
  mdiDownloadOutline,
  mdiSubtitles,
  mdiSubtitlesOutline,
  mdiVideo,
  mdiVideoOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import {
  compile,
  CompiledASS,
  decompile,
} from 'ass-compiler';

import './menu.scss';

const Menu = ({
  setSubtitle,
  setVideoSource,
  subtitle,
}: {
  setSubtitle: (subtitle: CompiledASS) => void,
  setVideoSource: React.Dispatch<React.SetStateAction<{
    src: string;
    type: string;
  } | undefined>>,
  subtitle: CompiledASS | undefined,
}) => {
  const [activeIcon, setActiveIcon] = useState('');

  let downloadLink = '';

  if (subtitle) {
    const blob = new Blob([decompile(subtitle)], { type: 'text/plain' });

    downloadLink = URL.createObjectURL(blob);
  }

  useEffect(() => () => {
    URL.revokeObjectURL(downloadLink);
  }, [downloadLink]);

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
            onMouseDown={() => setActiveIcon('mdiSubtitles')}
            onMouseUp={() => setActiveIcon('')}
            onBlur={() => setActiveIcon('')}
            onMouseOut={() => setActiveIcon('')}
          >
            <span className="file-icon">
              <Icon
                path={activeIcon === 'mdiSubtitles' ? mdiSubtitlesOutline : mdiSubtitles}
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
            onMouseDown={() => setActiveIcon('mdiVideo')}
            onMouseUp={() => setActiveIcon('')}
            onBlur={() => setActiveIcon('')}
            onMouseOut={() => setActiveIcon('')}
          >
            <span className="file-icon">
              <Icon
                path={activeIcon === 'mdiVideo' ? mdiVideoOutline : mdiVideo}
                size={1}
              />
            </span>
          </span>
        </label>
      </div>

      {
        subtitle && (
          <a
            download="subtitle.ass"
            href={downloadLink}
          >
            <Icon
              path={activeIcon === 'mdiDownload' ? mdiDownloadOutline : mdiDownload}
              size={1}
            />
          </a>
          // <button
          //   type="button"
          //   className="button"
          //   onMouseDown={() => setActiveIcon('mdiDownload')}
          //   onMouseUp={() => setActiveIcon('')}
          //   onBlur={() => setActiveIcon('')}
          //   onMouseOut={() => setActiveIcon('')}
          //   onClick={() => {
          //     const blob = new Blob([decompile(subtitle)], { type: 'text/plain' });
          //     const file = new File([blob], 'foo.ass', { type: 'text/plain' });
          //   }}
          // >
          //   <Icon
          //     path={activeIcon === 'mdiDownload' ? mdiDownloadOutline : mdiDownload}
          //     size={1}
          //   />
          // </button>
        )
      }
    </div>
  );
};

export default Menu;
