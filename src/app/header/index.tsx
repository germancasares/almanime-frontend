import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import routes from 'app/routes';

import Account from './_components/account';
import Brand from './_components/brand';
import Search from './_components/search';
import ThemeSwitch, { Props as ThemeSwitchProps } from './_components/themeSwitch';

import './index.scss';

type Props = ThemeSwitchProps;

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="navbar-item profile">
      <div className="field is-grouped">
        <p className="control">
          <button type="button" className="button" onClick={loginWithRedirect}>Login</button>
        </p>
      </div>
    </div>
  );
};

const Header = ({ theme, toggleTheme }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurger = () => setIsOpen(!isOpen);

  return (
    <nav id="header" className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        <Brand
          isOpen={isOpen}
          onClick={toggleBurger}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <div className={`navbar-menu${isOpen ? ' is-active' : ''}`}>
          <div className="navbar-start menu">
            <Link className="navbar-item" to={routes.home.view.path}>Home</Link>
            <Link className="navbar-item" to={routes.anime.list.path}>Anime</Link>
            <Link className="navbar-item" to={routes.fansub.list.path}>Fansub</Link>
            <Link className="navbar-item" to={routes.user.list.path}>Users</Link>
          </div>
          <div className="navbar-end">
            <Search />
            <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
            {/* <Link className="navbar-item" to={routes.user.list.path}>Login</Link> */}
            <Account />
            {/* <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">
                Log in
              </a>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <nav id="header" className="navbar is-fixed-top">
      <div className="container">
        {/* <Brand /> */}
        {/* <Menu /> */}
        <div className="navbar">
          {/* <Search /> */}
          {/* <ThemeSwitch theme={theme} toggleTheme={toggleTheme} /> */}
          <Account />
          {/* <Burger /> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
