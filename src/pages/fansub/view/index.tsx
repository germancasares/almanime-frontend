import {
  mdiCog,
  mdiFileUpload,
  mdiImageText,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import FansubApi from '../../../api/FansubApi';
import UserApi from '../../../api/UserApi';
import Loader from '../../../components/loader';
import Permission from '../../../enums/Permission';
import Helper from '../../../helper';
import routes from '../../routes';
import MembersPage from './_components/members';
import SubtitlesPage from './_components/subtitles';
import Tabs, { TabName } from './_components/tabs';
import './index.scss';

const CreateSubtitleButton = ({ acronym } : { acronym: string }) => (
  <Link className="button is-primary is-rounded" to={routes.subtitle.create.to(acronym)}>
    <span className="icon">
      <Icon path={mdiImageText} size={1} />
    </span>
    <span>Editor</span>
  </Link>
);

const UploadSubtitleButton = ({ acronym } : { acronym: string }) => (
  <Link className="button is-primary is-rounded" to={routes.subtitle.upload.to(acronym)}>
    <span className="icon">
      <Icon path={mdiFileUpload} size={1} />
    </span>
    <span>Subtitle</span>
  </Link>
);

const EditFansubButton = ({ acronym } : { acronym: string }) => (
  <Link className="button is-primary is-rounded" to={routes.fansub.edit.to(acronym)}>
    <span className="icon">
      <Icon path={mdiCog} size={1} />
    </span>
  </Link>
);

const JoinFansubButton = ({ onClick, isLoading } : { onClick: () => void, isLoading: boolean }) => (
  <button
    type="button"
    className={`button is-primary is-rounded${isLoading ? ' is-loading' : ''}`}
    onClick={onClick}
  >
    Join
  </button>
);

const useInitialTab = () => {
  const { hash } = useLocation();
  const urlTab = hash.replace('#', '');
  const initialTab = urlTab in TabName ? urlTab as TabName : TabName.Newest;
  return useState<TabName>(initialTab);
};

const View = ({ accessToken }: { accessToken?: string }) => {
  const { acronym } = useParams<{ acronym: string }>();
  const [activeTab, setActiveTab] = useInitialTab();

  const navigate = useNavigate();
  const changeTab = (newTab : TabName) => {
    setActiveTab(newTab);
    navigate(`#${newTab}`, { replace: true });
  };

  const { data: fansub } = FansubApi.GetByAcronym(acronym);
  const { data: isMember, isSuccess } = FansubApi.IsMember(acronym, accessToken);
  const { data: me } = UserApi.Me(accessToken);

  const { mutateAsync, isLoading } = FansubApi.Join();
  const joinFansub = async () => {
    if (!acronym) return;

    await mutateAsync({
      acronym,
      accessToken,
    });
  };

  if (!fansub || !acronym) return (<Loader />);

  return (
    <main id="fansub-view" className="container">
      <section className="section">
        <h1 className="title">
          { fansub.name }
          {
            Helper.HasPermission(Permission.EditPermissions, acronym, me) && (
              <EditFansubButton acronym={acronym} />
            )
          }
          {
            isSuccess && !isMember && (
              <JoinFansubButton onClick={joinFansub} isLoading={isLoading} />
            )
          }
          {
            Helper.HasPermission(Permission.DraftSubtitle, acronym, me) && (
              <>
                <UploadSubtitleButton acronym={acronym} />
                <CreateSubtitleButton acronym={acronym} />
              </>
            )
          }
        </h1>
        <Tabs activeTab={activeTab} changeTab={changeTab} />
        { activeTab === TabName.Members ? <MembersPage acronym={acronym} /> : null }
        { activeTab === TabName.Subtitles ? <SubtitlesPage acronym={acronym} accessToken={accessToken} /> : null }
      </section>
    </main>
  );
};

export default View;
