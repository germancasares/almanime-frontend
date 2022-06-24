import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';

import routes from 'app/routes';

import './brand.scss';

const Brand = () => (
  <div className="navbar-brand brand">
    <Link to={routes.home.view.path} className="navbar-item">
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
