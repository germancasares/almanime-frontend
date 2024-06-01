import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './index.scss';
import UserApi from '../../../api/UserApi';
import { User } from '../../../types/user';
import routes from '../../routes';
import Loader from '../../../components/loader';

const Create = ({ accessToken }: { accessToken?: string }) => {
  const { getIdTokenClaims } = useAuth0();
  const { mutateAsync, isLoading } = UserApi.Create();
  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const createUserAsync = async () => {
      const claims = await getIdTokenClaims();
      if (!claims || !claims.nickname) {
        throw new Error(`This accessToken does not have claims/nickname ${accessToken}`);
      }

      const newUser = { name: claims.nickname } as User;

      const { isNew } = await (await mutateAsync({
        user: newUser,
        accessToken,
      }));

      if (isNew) {
        setUser(newUser);
      } else {
        navigate(routes.home.view.path);
      }
    };

    createUserAsync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return (<Loader />);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({
      user,
      accessToken,
    });

    navigate(routes.home.view.path);
  };

  return (
    <main id="user-create" className="container">
      <section className="column is-narrow">
        <h3 className="title">Finish Account Setup</h3>
        <form onSubmit={onSubmit} autoComplete="on">
          <div className="field">
            <label className="label" htmlFor="name">Username</label>
            <div className="control">
              <input
                name="name"
                className="input"
                type="text"
                value={user.name}
                onChange={({ target: { value } }) => setUser({ name: value, permissions: {}, fansubs: [] })}
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
