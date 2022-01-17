import routes from 'app/routes';
import { Link } from 'react-router-dom';
import './menu.scss';

const Menu = () => (
  <div className="navbar-menu menu">
    <div className="navbar-start">
      <Link className="navbar-item" to={routes.home.path}>Home</Link>
      <Link className="navbar-item" to={routes.animeList.path}>Anime</Link>
      <Link className="navbar-item" to={routes.fansubList.path}>Fansub</Link>
      <Link className="navbar-item" to={routes.userList.path}>Users</Link>
    </div>
  </div>
);

export default Menu;
