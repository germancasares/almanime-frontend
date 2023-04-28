import { MouseEvent, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  mdiContentSave,
  mdiContentSaveOutline,
  mdiDownload,
  mdiDownloadOutline,
  mdiPalette,
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

import SubtitleApi from 'api/SubtitleApi';
import SubtitleLanguage from 'enums/SubtitleLanguage';

import './menu.scss';

const Menu = ({
  setSubtitle,
  setVideoSource,
  subtitle,
  fansubAcronym,
  animeSlug,
  episodeNumber,
  subtitleLanguage,
  setIsStylesActive,
}: {
  setSubtitle: (subtitle: CompiledASS) => void,
  setVideoSource: React.Dispatch<React.SetStateAction<{
    src: string;
    type: string;
  } | undefined>>,
  subtitle: CompiledASS | undefined,
  fansubAcronym?: string,
  animeSlug?: string,
  episodeNumber?: string,
  subtitleLanguage?: SubtitleLanguage,
  setIsStylesActive: (isActive: boolean) => void,
}) => {
  const [activeIcon, setActiveIcon] = useState('');

  const { getAccessTokenSilently } = useAuth0();
  const { mutateAsync, isLoading } = SubtitleApi.Post();
  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!(fansubAcronym && animeSlug && episodeNumber && subtitleLanguage && subtitle)) return;

    await mutateAsync({
      subtitle: {
        fansubAcronym,
        animeSlug,
        episodeNumber,
        subtitleLanguage,
        file: new File(
          [decompile(subtitle)],
          `[${fansubAcronym}]${animeSlug}-${episodeNumber}.ass`,
          { type: 'text/plain' },
        ),
      },
      token: await getAccessTokenSilently(),
    });
  };

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

      <button type="button" className="button" onClick={() => setIsStylesActive(true)}>
        <Icon
          path={mdiPalette}
          size={1}
        />
      </button>

      {
        subtitle && (
          <a
            className="button is-last"
            title="Download subtitle"
            download={`[${fansubAcronym}]${animeSlug}-${episodeNumber}.ass`}
            href={downloadLink}
          >
            <Icon
              path={activeIcon === 'mdiDownload' ? mdiDownloadOutline : mdiDownload}
              size={1}
            />
          </a>
        )
      }

      {
        subtitle && (
          <button
            type="button"
            className={`button ${isLoading ? ' is-loading' : ''}`}
            title="Save subtitle to fansub"
            onClick={onClick}
          >
            <Icon
              path={activeIcon === 'mdiContentSave' ? mdiContentSaveOutline : mdiContentSave}
              size={1}
            />
          </button>
        )
      }
    </div>
  );
};

export default Menu;
