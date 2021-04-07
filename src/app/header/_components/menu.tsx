import { Link } from 'react-router-dom';
import './menu.scss';

const Menu = (): JSX.Element => (
  <div className="navbar-menu menu">
    <div className="navbar-start">
      <Link className="navbar-item" to="/">Home</Link>
      <Link className="navbar-item" to="/">Anime</Link>
      <Link className="navbar-item" to="/">Fansub</Link>
      <Link className="navbar-item" to="/">Users</Link>
    </div>
  </div>
);

export default Menu;
