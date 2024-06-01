import { Link } from "react-router-dom";
import UserAvatar from "react-user-avatar";
import { useAuth0 } from "@auth0/auth0-react";
import "./account.scss";
import UserApi from "../../../api/UserApi";
import routes from "../../routes";
import { withAccessToken } from "../../../utils";

const Profile = ({
  accessToken,
  toggleBurger,
}: {
  accessToken?: string;
  toggleBurger: () => void;
}) => {
  const { user, logout } = useAuth0();
  const { data: me } = UserApi.Me(accessToken);

  return (
    <div id="profile" className="navbar-item has-dropdown is-hoverable">
      <div className="navbar-link">
        <UserAvatar size={40} name={user?.name} src={user?.picture} />
        <div className="username">{me?.name ?? ""}</div>
      </div>

      <div className="navbar-dropdown is-right">
        <Link
          className="navbar-item"
          to={routes.user.edit.path}
          onClick={toggleBurger}
        >
          Profile
        </Link>
        <Link
          className="navbar-item"
          to={routes.favorites.view.path}
          onClick={toggleBurger}
        >
          Favorites
        </Link>
        <Link
          className="navbar-item"
          to={routes.settings.edit.path}
          onClick={toggleBurger}
        >
          Setttings
        </Link>
        <hr className="navbar-divider" />
        <a
          className="navbar-item"
          href="/#"
          onClick={() => {
            toggleBurger();
            logout();
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

const ProfileWithToken = withAccessToken(Profile);

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id="profile" className="navbar-item">
      <button
        type="button"
        className="button is-fullwidth"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
    </div>
  );
};

const Account = ({ toggleBurger }: { toggleBurger: () => void }) =>
  useAuth0().isAuthenticated ? (
    <ProfileWithToken toggleBurger={toggleBurger} />
  ) : (
    <Login />
  );

export default Account;
