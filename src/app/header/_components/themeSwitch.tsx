import Icon from '@mdi/react';
import { mdiWhiteBalanceSunny, mdiWeatherNight } from '@mdi/js';
import Theme from 'enums/Theme';
import './themeSwitch.scss';

export type Props = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeSwitch = ({ theme, toggleTheme }: Props): JSX.Element => (
  <div className="navbar-item themeSwitch px-0">
    <button
      type="button"
      className="button p-0"
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
