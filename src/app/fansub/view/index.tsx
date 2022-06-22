import { useState } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { mdiFilePlusOutline, mdiCog } from '@mdi/js'; 
import Icon from '@mdi/react';

import routes from 'app/routes';
import FansubApi from 'api/FansubApi';

import Tabs from './_components/tabs';
import MembersPage from './_components/members';
import SubtitlesPage from './_components/subtitles';

import './index.scss';
import Loader from 'components/loader';
import { useAuth0 } from '@auth0/auth0-react';
import UserApi from 'api/UserApi';
import Permission from 'enums/Permission';
import Helper from 'app/helper';

export enum TabName {
  Newest = 'Newest',
  Subtitles = 'Subtitles',
  Members = 'Members',
  About = 'About',
}

const NewSubtitleButton = ({ acronym } : { acronym: string }) => (
  <Link className="button is-rounded" to={routes.subtitle.create.to(acronym)}>
    <span className="icon">
      <Icon path={mdiFilePlusOutline} size={1} />
    </span>
    <span>New Subtitle</span>
  </Link>
);

const EditFansubButton = ({ acronym } : { acronym: string }) => (
  <Link className="button is-rounded" to={routes.fansub.edit.to(acronym)}>
    <span className="icon">
      <Icon path={mdiCog} size={1} />
    </span>
  </Link>
);

const JoinFansubButton = ({ onClick, isLoading } : { onClick: () => void, isLoading: boolean }) => (
  <button
    className={`button is-rounded${isLoading ? ' is-loading' : ''}`}
    onClick={onClick}
  >
    Join
  </button>
);

const useInitialTab = () => {
  const { hash } = useLocation();
  const urlTab = hash.replace('#', '');
  let initialTab = TabName.Newest;
  if ((urlTab in TabName)) initialTab = urlTab as TabName;
  return useState<TabName>(initialTab);
};

const View = ({ token }: { token?: string }) => {
  const { acronym } = useParams<{ acronym: string }>();
  const [activeTab, setActiveTab] = useInitialTab();

  const navigate = useNavigate();
  const changeTab = (newTab : TabName) => {
    setActiveTab(newTab);
    navigate(`#${newTab}`, { replace: true });
  };

  const { data: fansub } = FansubApi.GetByAcronym(acronym);
  const { data: isMember, isSuccess } = FansubApi.IsMember(acronym, token);
  const { data: me } = UserApi.Me(token);

  const { getAccessTokenSilently } = useAuth0();
  const { mutateAsync, isLoading } = FansubApi.Join();
  const joinFansub = async () => {
    if (!acronym) return;

    await mutateAsync({
      acronym,
      token: await getAccessTokenSilently(),
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
            Helper.HasPermission(Permission.CreateSubtitle, acronym, me) && (
              <NewSubtitleButton acronym={acronym} />
            )
          }
        </h1>
        <Tabs activeTab={activeTab} changeTab={changeTab} />
        <>
          { activeTab === TabName.Members ? <MembersPage acronym={acronym} /> : null }
          { activeTab === TabName.Subtitles ? <SubtitlesPage acronym={acronym} /> : null }
        </>
      </section>
    </main>
  );
};

export default View;
