import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import UserAvatar from 'react-user-avatar';

import routes from 'app/routes';

import './account.scss';
import { useEffect } from 'react';

const Profile = () => {
  const {
    user,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      console.debug(await getAccessTokenSilently());
    })();
  });

  return (
    <div id="profile" className="navbar-item has-dropdown is-hoverable">
      <div className="navbar-link">
        <UserAvatar
          size={40}
          name={user?.name}
          src={user?.picture}
        />
      </div>

      <div className="navbar-dropdown is-right">
        <Link className="navbar-item" to={routes.user.edit.path}>Profile</Link>
        <Link className="navbar-item" to={routes.favorites.view.path}>Favorites</Link>
        <Link className="navbar-item" to={routes.settings.edit.path}>Setttings</Link>
        <hr className="navbar-divider" />
        <a className="navbar-item" href="/#" onClick={() => logout()}>Logout</a>
      </div>
    </div>
  );
};

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

const Account = () => (useAuth0().isAuthenticated ? <Profile /> : <Login />);

export default Account;
