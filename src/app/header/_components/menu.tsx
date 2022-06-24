import { Link } from 'react-router-dom';

import routes from 'app/routes';

import './menu.scss';

const Menu = () => (
  <div className="navbar-menu menu">
    <div className="navbar-start">
      <Link className="navbar-item" to={routes.home.view.path}>Home</Link>
      <Link className="navbar-item" to={routes.anime.list.path}>Anime</Link>
      <Link className="navbar-item" to={routes.fansub.list.path}>Fansub</Link>
      <Link className="navbar-item" to={routes.user.list.path}>Users</Link>
    </div>
  </div>
);

export default Menu;
