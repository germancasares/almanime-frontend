/* eslint-disable jsx-a11y/anchor-is-valid */
import Icon from '@mdi/react';
import { 
  mdiDecagram,
  mdiLibraryShelves,
  mdiAccountGroup,
  mdiInformationVariant,
} from '@mdi/js';

import './tabs.scss';
import { TabName } from '..';

const Tab = (
  { name, activeTab, iconPath, changeTab }:
  { name: TabName, activeTab: string, iconPath: string, changeTab: (newTab: TabName) => void },
) => (
  <li
    className={activeTab === name ? 'is-active' : ''}
    onClick={() => changeTab(name)}
  >
    <a>
      <Icon className="icon" path={iconPath} size={1} />
      <span>{name}</span>
    </a>
  </li>
);

const Tabs = (
  { activeTab, changeTab } :
  { activeTab : TabName, changeTab: (newTab: TabName) => void },
) => {

  return (
    <div id="tabs">
      <div className="tabs is-centered is-toggle is-fullwidth is-primary">
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
};

export default Tabs;
