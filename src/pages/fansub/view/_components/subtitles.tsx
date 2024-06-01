import {
  mdiArchiveArrowDown,
  mdiDelete,
  mdiDownload,
  mdiImageText,
  mdiPublish,
} from '@mdi/js';
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import FansubApi from '../../../../api/FansubApi';
import SubtitleApi from '../../../../api/SubtitleApi';
import UserApi from '../../../../api/UserApi';
import Loader from '../../../../components/loader';
import Permission from '../../../../enums/Permission';
import Formatter from '../../../../formatter';
import Helper from '../../../../helper';
import { API } from '../../../../settings';
import routes from '../../../routes';
import './subtitles.scss';

const Subtitles = ({ acronym, accessToken }: { acronym: string, accessToken?: string }) => {
  const { data: publishedSubtitles } = FansubApi.GetPublishedSubtitles(acronym);
  const { data: draftedSubtitles } = FansubApi.GetSubtitlesDrafts(acronym, accessToken);
  const { data: me } = UserApi.Me(accessToken);
  const canDraft = Helper.HasPermission(Permission.DraftSubtitle, acronym, me);
  const canPublish = Helper.HasPermission(Permission.PublishSubtitle, acronym, me);
  const canUnpublish = Helper.HasPermission(Permission.UnpublishSubtitle, acronym, me);
  const canDelete = Helper.HasPermission(Permission.DeleteSubtitle, acronym, me);
  const { mutateAsync: publishAsync } = SubtitleApi.Publish();
  const { mutateAsync: unpublishAsync } = SubtitleApi.Unpublish();
  const { mutateAsync: deleteAsync } = SubtitleApi.Delete();

  if (!publishedSubtitles && !draftedSubtitles) return (<Loader />);

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
            (canPublish || canUnpublish || canDelete) && (
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
          (canPublish || canUnpublish || canDelete) && draftedSubtitles?.map(({
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
                  href={`${API}${url}`}
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
                      accessToken,
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
                      state={{ subtitleUrl: `${API}${url}`, format }}
                    >
                      <Icon
                        path={mdiImageText}
                        size={1}
                      />
                    </Link>
                  )
                }
                {
                  canDelete && (
                    <button
                      type="button"
                      className="button is-small"
                      title="Delete subtitle"
                      onClick={async (event) => {
                        event.preventDefault();
                        await deleteAsync({
                          id,
                          fansubAcronym: acronym,
                          animeSlug,
                          episodeNumber: episode,
                          accessToken,
                        });
                      }}
                    >
                      <Icon
                        path={mdiDelete}
                        size={1}
                      />
                    </button>
                  )
                }
              </td>
            </tr>
          ))
        }
        {
          publishedSubtitles?.map(({
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
                  href={`${API}${url}`}
                >
                  <Icon path={mdiDownload} size={1} />
                </a>
              </td>
              {
                (canPublish || canUnpublish || canDelete) && (
                  <>
                    <td>Published</td>
                    <td className="fullwidth">
                      <button
                        type="button"
                        className="button is-small"
                        title="Unpublish subtitle"
                        onClick={async (event) => {
                          event.preventDefault();
                          await unpublishAsync({
                            id,
                            fansubAcronym: acronym,
                            animeSlug,
                            episodeNumber: episode,
                            accessToken,
                          });
                        }}
                      >
                        <Icon
                          path={mdiArchiveArrowDown}
                          size={1}
                        />
                      </button>
                      {
                        canDelete && (
                          <button
                            type="button"
                            className="button is-small"
                            title="Delete subtitle"
                            onClick={async (event) => {
                              event.preventDefault();
                              await deleteAsync({
                                id,
                                fansubAcronym: acronym,
                                animeSlug,
                                episodeNumber: episode,
                                accessToken,
                              });
                            }}
                          >
                            <Icon
                              path={mdiDelete}
                              size={1}
                            />
                          </button>
                        )
                      }
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
