import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
import Icon from '@mdi/react';

import Theme from 'enums/Theme';

import './themeSwitch.scss';

export type Props = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeSwitch = ({ theme, toggleTheme }: Props) => (
  <div className="navbar-item themeSwitch">
    <button
      type="button"
      className="button"
      onClick={toggleTheme}
    >
      <Icon
        path={theme === Theme.Light ? mdiWeatherNight : mdiWhiteBalanceSunny}
        size={1}
      />
    </button>
  </div>
);

export default ThemeSwitch;
