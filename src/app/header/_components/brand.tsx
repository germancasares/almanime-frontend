import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';
import './brand.scss';
import routes from 'app/routes';

const Brand = () => (
  <div className="navbar-brand brand">
    <Link to={routes.home.path} className="navbar-item">
      <Logo width="30" height="28" />
    </Link>

    <div className="navbar-burger">
      <span />
      <span />
      <span />
    </div>
  </div>
);

export default Brand;
