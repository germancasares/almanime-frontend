import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { mdiFilePlusOutline } from '@mdi/js'; 
import { clear } from '../store/reducers';
import { getFansubByAcronym, getIsMember } from '../store/actions';
import { State } from 'app/store';

import Icon from '@mdi/react';
import Tabs from './_components/tabs';
import MembersPage from './_components/members';

import './index.scss';
import routes from 'app/routes';
import SubtitlesPage from './_components/subtitles';
import { useAuth0 } from '@auth0/auth0-react';

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

const View = () => {
  const { acronym } = useParams<{ acronym: string }>();

  const navigate = useNavigate();
  const { hash } = useLocation();

  const urlTab = hash.replace('#', '');
  let initialTab = TabName.Newest;
  if ((urlTab in TabName)) initialTab = urlTab as TabName;
  const [activeTab, setActiveTab] = useState<TabName>(initialTab);

  const changeTab = (newTab : TabName) => {
    setActiveTab(newTab);
    navigate(`#${newTab}`, { replace: true });
  };

  const { getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();
  const fansub = useSelector((state: State) => state.fansub.fansub);
  const isMember = useSelector((state: State) => state.fansub.isMember);

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
  }, [dispatch]);

  useEffect(() => {
    if (acronym === undefined) return;


    dispatch(getFansubByAcronym(acronym));
    getAccessTokenSilently().then(token => dispatch((getIsMember({ acronym, token }))));
  }, [dispatch, acronym, getAccessTokenSilently]);

  return (
    <main id="fansub-view" className="container">
      <section className="section">
        <h1 className="title">
          { fansub.name }
          {/* Show button if user is member of fansub */}
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
