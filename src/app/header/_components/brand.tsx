import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';

import routes from 'app/routes';

import ThemeSwitch, { Props as ThemeSwitchProps } from './themeSwitch';

import './brand.scss';

type Props = {
  isOpen: boolean,
  onClick: () => void;
} & ThemeSwitchProps;

const Brand = ({
  isOpen,
  onClick,
  theme,
  toggleTheme,
}: Props) => (
  <div className="navbar-brand">
    <Link to={routes.home.view.path} className="navbar-item">
      <Logo width="30" height="28" />
    </Link>
    <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
    <button
      type="button"
      className={`navbar-burger burger${isOpen ? ' is-active' : ''}`}
      aria-label="menu"
      aria-expanded={isOpen}
      data-target="navbarBasicExample"
      onClick={onClick}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  </div>
);

export default Brand;
