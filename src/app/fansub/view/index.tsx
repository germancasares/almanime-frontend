import { useState } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { mdiFilePlusOutline } from '@mdi/js'; 
import Icon from '@mdi/react';

import routes from 'app/routes';
import FansubApi from 'api/FansubApi';

import Tabs from './_components/tabs';
import MembersPage from './_components/members';
import SubtitlesPage from './_components/subtitles';

import './index.scss';
import Loader from 'components/loader';

export enum TabName {
  Newest = 'Newest',
  Subtitles = 'Subtitles',
  Members = 'Members',
  About = 'About',
}

const NewSubtitleButton = ({ acronym } : { acronym: string }) => (
  <Link className="button is-primary is-rounded" to={routes.subtitleCreate.to(acronym)}>
    <span className="icon">
      <Icon path={mdiFilePlusOutline} size={1} />
    </span>
    <span>New Subtitle</span>
  </Link>
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
  const { data: isMember } = FansubApi.IsMember(acronym, token);

  if (!fansub) return (<Loader />);

  return (
    <main id="fansub-view" className="container">
      <section className="section">
        <h1 className="title">
          { fansub.name }
          { acronym && isMember && <NewSubtitleButton acronym={acronym} /> }
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
