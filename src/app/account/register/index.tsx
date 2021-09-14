import { Link } from 'react-router-dom';
import Form from './_components/form';
import './index.scss';

const Register = (): JSX.Element => (
  <div id="register" className="hero is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <h1 className="title">Create an account</h1>
            <Form />
            <p className="links has-text-centered">
              <Link to="#">Login</Link>
              &nbsp;|&nbsp;
              <Link to="#">Need help?</Link>
            </p>
            {/* <p class="links has-text-centered">
              <router-link :to="{ name: 'login' }">Login </router-link>|
              <a href="#">Need help?</a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Register;
