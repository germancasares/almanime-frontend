import { Link } from 'react-router-dom';
import {
  mdiArchiveArrowDown,
  mdiDownload,
  mdiImageText,
  mdiPublish,
} from '@mdi/js';
import Icon from '@mdi/react';

import FansubApi from 'api/FansubApi';
import SubtitleApi from 'api/SubtitleApi';
import UserApi from 'api/UserApi';
import Formatter from 'app/formatter';
import Helper from 'app/helper';
import routes from 'app/routes';
import Permission from 'enums/Permission';

import Loader from 'components/loader';

import './subtitles.scss';

const Subtitles = ({ acronym, token }: { acronym: string, token?: string }) => {
  const { data: publishedSubtitles } = FansubApi.GetPublishedSubtitles(acronym);
  const { data: draftedSubtitles } = FansubApi.GetSubtitlesDrafts(acronym, token);
  const { data: me } = UserApi.Me(token);
  const canDraft = Helper.HasPermission(Permission.DraftSubtitle, acronym, me);
  const canPublish = Helper.HasPermission(Permission.PublishSubtitle, acronym, me);
  const canUnpublish = Helper.HasPermission(Permission.UnpublishSubtitle, acronym, me);
  const { mutateAsync: publishAsync } = SubtitleApi.Publish();
  const { mutateAsync: unpublishAsync } = SubtitleApi.Unpublish();

  if (!publishedSubtitles) return (<Loader />);

  return (
    <table id="subtitles" className="table is-fullwidth">
      <thead>
        <tr>
          <th>Anime</th>
          <th>Episode</th>
          <th>Created on</th>
          <th>Format</th>
          <th>Language</th>
          <th>User</th>
          <th>Download</th>
          {
            (canPublish || canUnpublish) && (
              <>
                <th>Status</th>
                <th>Action</th>
              </>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          (canPublish || canUnpublish) && draftedSubtitles?.map(({
            id, url, user, anime, animeSlug, episode, format, language, creationDate,
          }) => (
            <tr key={id}>
              <td>
                <Link
                  to={routes.anime.view.to(animeSlug)}
                >
                  {anime}
                </Link>
              </td>
              <td>{episode}</td>
              <td>{Formatter.DateFull(creationDate.toString())}</td>
              <td>{format}</td>
              <td>{Formatter.LanguageFlag(language)}</td>
              <td>{user}</td>
              <td>
                <a
                  className="button is-small is-fullwidth"
                  title="Download subtitle"
                  href={`${process.env.REACT_APP_API}${url}`}
                >
                  <Icon path={mdiDownload} size={1} />
                </a>
              </td>
              <td>Drafted</td>
              <td className="fullwidth">
                <button
                  type="button"
                  className="button is-small"
                  title="Publish subtitle"
                  onClick={async (event) => {
                    event.preventDefault();
                    await publishAsync({
                      id,
                      fansubAcronym: acronym,
                      animeSlug,
                      episodeNumber: episode,
                      token,
                    });
                  }}
                >
                  <Icon
                    path={mdiPublish}
                    size={1}
                  />
                </button>
                {
                  canDraft && (
                    <Link
                      className="button is-small"
                      to={routes.subtitle.editor.to(acronym, animeSlug, episode.toString())}
                      state={{ subtitleUrl: `${process.env.REACT_APP_API}${url}` }}
                    >
                      <Icon
                        path={mdiImageText}
                        size={1}
                      />
                    </Link>
                  )
                }
              </td>
            </tr>
          ))
        }
        {
          publishedSubtitles.map(({
            id, url, user, anime, animeSlug, episode, format, language, creationDate,
          }) => (
            <tr key={id}>
              <td>
                <Link
                  to={routes.anime.view.to(animeSlug)}
                >
                  {anime}
                </Link>
              </td>
              <td>{episode}</td>
              <td>{Formatter.DateFull(creationDate.toString())}</td>
              <td>{format}</td>
              <td>{Formatter.LanguageFlag(language)}</td>
              <td>{user}</td>
              <td>
                <a
                  className="button is-small is-fullwidth"
                  title="Download subtitle"
                  href={`${process.env.REACT_APP_API}${url}`}
                >
                  <Icon path={mdiDownload} size={1} />
                </a>
              </td>
              {
                (canPublish || canUnpublish) && (
                  <>
                    <td>Published</td>
                    <td>
                      <button
                        type="button"
                        className="button is-small is-fullwidth"
                        title="Unpublish subtitle"
                        onClick={async (event) => {
                          event.preventDefault();
                          await unpublishAsync({
                            id,
                            fansubAcronym: acronym,
                            animeSlug,
                            episodeNumber: episode,
                            token,
                          });
                        }}
                      >
                        <Icon
                          path={mdiArchiveArrowDown}
                          size={1}
                        />
                      </button>
                    </td>
                  </>
                )
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Subtitles;
