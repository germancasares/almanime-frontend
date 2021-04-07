import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';
import './brand.scss';

const Brand = (): JSX.Element => (
  <div className="navbar-brand brand">
    <Link to="/" className="navbar-item">
      <Logo width="50" height="28" />
    </Link>

    <div className="navbar-burger">
      <span />
      <span />
      <span />
    </div>
  </div>
);

export default Brand;
