import { FormEvent, useEffect, useState } from 'react';

import UserApi from 'api/UserApi';
import { User } from 'types/user';

import Loader from 'components/loader';

import './index.scss';

const Edit = ({ token }: { token?: string }) => {
  const { data: me } = UserApi.Me(token);
  const [user, setUser] = useState({ name: '' } as User);
  const { mutateAsync, isLoading } = UserApi.Update();

  useEffect(() => me && setUser(me), [me]);

  if (!me) return (<Loader />);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutateAsync({
      user,
      token,
    });
  };

  return (
    <main id="edit" className="container">
      <section className="column is-narrow">
        <h3 className="title">Profile</h3>
        <form onSubmit={onSubmit} autoComplete="on">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="label" htmlFor="name">Name</label>
            <div className="control">
              <input
                name="name"
                className="input"
                type="text"
                value={user.name}
                placeholder="Luffy"
                onChange={({ target: { value } }) => setUser({ name: value, permissions: me.permissions })}
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

export default Edit;
