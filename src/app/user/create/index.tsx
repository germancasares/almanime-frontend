import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserApi from 'api/UserApi';
import routes from 'app/routes';
import { User } from 'types/user';

import Loader from 'components/loader';

import './index.scss';

const Create = ({ token }: { token?: string }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as User);
  const { mutateAsync, isLoading } = UserApi.Create();

  const { isFetched, isSuccess } = UserApi.Me(token, false);

  if (isSuccess) navigate(routes.home.view.path);
  if (!isFetched) return (<Loader />);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({
      user,
      token,
    });

    navigate(routes.home.view.path);
  };

  return (
    <main id="user-create" className="container">
      <section className="column is-narrow">
        <h3 className="title">Finish Account Setup</h3>
        <form onSubmit={onSubmit}>
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="label" htmlFor="name">Username</label>
            <div className="control">
              <input
                name="name"
                className="input"
                type="text"
                placeholder="Luffy"
                onChange={({ target: { value } }) => setUser({ name: value, permissions: {} })}
              />
            </div>
          </div>

          <div className="control">
            <button type="submit" className={`button is-link${isLoading ? ' is-loading' : ''}`}>Submit</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Create;
