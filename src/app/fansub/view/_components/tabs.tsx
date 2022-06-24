import {
  mdiAccountGroup,
  mdiDecagram,
  mdiInformationVariant,
  mdiLibraryShelves,
} from '@mdi/js';
import Icon from '@mdi/react';

import './tabs.scss';

export enum TabName {
  Newest = 'Newest',
  Subtitles = 'Subtitles',
  Members = 'Members',
  About = 'About',
}

const Tab = (
  {
    name, activeTab, iconPath, changeTab,
  }:
  { name: TabName, activeTab: string, iconPath: string, changeTab: (newTab: TabName) => void },
) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <li
    role="tab"
    className={activeTab === name ? 'is-active' : ''}
    onClick={() => changeTab(name)}
    tabIndex={0}
  >
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a>
      <Icon className="icon" path={iconPath} size={1} />
      <span>{name}</span>
    </a>
  </li>
);

const Tabs = (
  { activeTab, changeTab } :
  { activeTab : TabName, changeTab: (newTab: TabName) => void },
) => (
  <div id="tabs">
    <div className="tabs is-centered is-toggle is-fullwidth">
      <ul>
        <Tab
          name={TabName.Newest}
          iconPath={mdiDecagram}
          activeTab={activeTab}
          changeTab={changeTab}
        />
        <Tab
          name={TabName.Subtitles}
          iconPath={mdiLibraryShelves}
          activeTab={activeTab}
          changeTab={changeTab}
        />
        <Tab
          name={TabName.Members}
          iconPath={mdiAccountGroup}
          activeTab={activeTab}
          changeTab={changeTab}
        />
        <Tab
          name={TabName.About}
          iconPath={mdiInformationVariant}
          activeTab={activeTab}
          changeTab={changeTab}
        />
      </ul>
    </div>
  </div>
);

export default Tabs;
