import Brand from './_components/brand';
import Menu from './_components/menu';
import Search from './_components/search';
import Account from './_components/account';
import ThemeSwitch, { Props as ThemeSwitchProps } from './_components/themeSwitch';
import './index.scss';

type Props = ThemeSwitchProps;

const Header = ({ theme, toggleTheme }: Props) => (
  <nav id="header" className="navbar is-fixed-top">
    <div className="container">
      <Brand />
      <Menu />
      <div className="navbar">
        <Search />
        <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
        <Account />
      </div>
    </div>
  </nav>
);

export default Header;
