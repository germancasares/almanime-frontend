import { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import Account from "./_components/account";
import Brand from "./_components/brand";
import Search from "./_components/search";
import ThemeSwitch, {
  Props as ThemeSwitchProps,
} from "./_components/themeSwitch";
import "./index.scss";

type Props = ThemeSwitchProps;

const Header = ({ theme, toggleTheme }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurger = () => setIsOpen(!isOpen);

  return (
    <nav
      id="header"
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Brand
          isOpen={isOpen}
          onClick={toggleBurger}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <div className={`navbar-menu${isOpen ? " is-active" : ""}`}>
          <div className="navbar-start menu">
            <Link
              className="navbar-item"
              to={routes.home.view.path}
              onClick={toggleBurger}
            >
              Home
            </Link>
            <Link
              className="navbar-item"
              to={routes.anime.list.path}
              onClick={toggleBurger}
            >
              Anime
            </Link>
            <Link
              className="navbar-item"
              to={routes.fansub.list.path}
              onClick={toggleBurger}
            >
              Fansub
            </Link>
            <Link
              className="navbar-item"
              to={routes.user.list.path}
              onClick={toggleBurger}
            >
              Users
            </Link>
          </div>
          <div className="navbar-end">
            <Search />
            <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
            <Account toggleBurger={toggleBurger} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
