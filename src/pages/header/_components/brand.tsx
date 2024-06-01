import { Link } from 'react-router-dom';
import logoUrl from '../../../assets/logo.svg';
import routes from '../../routes';
import './brand.scss';
import ThemeSwitch, { Props as ThemeSwitchProps } from './themeSwitch';

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
      <img width="30" height="28" src={logoUrl} alt="Almanime logo" />
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
