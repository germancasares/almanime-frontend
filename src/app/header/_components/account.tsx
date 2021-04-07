import { Link } from 'react-router-dom';

const Profile = (): JSX.Element => (
  <>
    <div />
  </>
);

const Register = (): JSX.Element => (
  <div className="navbar-item account">
    <div className="field is-grouped">
      <p className="control">
        <Link className="button" to="/register">Register</Link>
      </p>
      <p className="control">
        <Link className="button" to="/login">Login</Link>
      </p>
    </div>
  </div>
);

const Account = (): JSX.Element => {
  const isLogged = false;

  return isLogged ? <Profile /> : <Register />;
};

export default Account;
