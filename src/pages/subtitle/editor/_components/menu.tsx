import { useAuth0 } from '@auth0/auth0-react';
import {
  mdiContentSave,
  mdiContentSaveOutline,
  mdiDownload,
  mdiDownloadOutline,
  mdiPalette,
} from '@mdi/js';
import Icon from '@mdi/react';
import {
  CompiledASS,
  decompile,
} from 'ass-compiler';
import { MouseEvent, useEffect, useState } from 'react';
import SubtitleApi from '../../../../api/SubtitleApi';
import SubtitleLanguage from '../../../../enums/SubtitleLanguage';
import './menu.scss';

const Menu = ({
  subtitle,
  fansubAcronym,
  animeSlug,
  episodeNumber,
  language,
  setIsStylesActive,
}: {
  subtitle: CompiledASS | undefined,
  fansubAcronym?: string,
  animeSlug?: string,
  episodeNumber?: string,
  language?: SubtitleLanguage,
  setIsStylesActive: (isActive: boolean) => void,
}) => {
  const [activeIcon, setActiveIcon] = useState('');

  const { getAccessTokenSilently } = useAuth0();
  const { mutateAsync, isLoading } = SubtitleApi.Post();
  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!(fansubAcronym && animeSlug && episodeNumber && language && subtitle)) return;

    await mutateAsync({
      subtitle: {
        fansubAcronym,
        animeSlug,
        episodeNumber,
        language,
        file: new File(
          [decompile(subtitle)],
          `[${fansubAcronym}]${animeSlug}-${episodeNumber}.ass`,
          { type: 'text/plain' },
        ),
      },
      accessToken: await getAccessTokenSilently(),
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
            onMouseDown={() => setActiveIcon('mdiDownload')}
            onMouseUp={() => setActiveIcon('')}
            onBlur={() => setActiveIcon('')}
            onMouseOut={() => setActiveIcon('')}
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
            onMouseDown={() => setActiveIcon('mdiContentSave')}
            onMouseUp={() => setActiveIcon('')}
            onBlur={() => setActiveIcon('')}
            onMouseOut={() => setActiveIcon('')}
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
