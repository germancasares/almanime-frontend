import UserApi from 'api/UserApi';
import routes from 'app/routes';
import Loader from 'components/loader';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'types/user';

const Create = ({ token }: { token?: string }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as User);
  const { mutateAsync } = UserApi.Post();

  const { data: me, isFetched } = UserApi.Me(token);

  useEffect(() => {
    if (me) navigate(routes.home.path);
  }, [me, navigate]);

  if (!isFetched) return (<Loader />);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({
      user,
      token,
    });

    navigate(routes.home.path);
  };

  return (
    <main id="user-create" className="container">
      <section className="column is-narrow">
        <h3 className="title">Finish Account Setup</h3>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label className="label" htmlFor="name">Name</label>
            <div className="control">
              <input 
                name="name" 
                className="input" 
                type="text" 
                placeholder="Example no Fansub" 
                onChange={({ target: { value } }) => setUser({ name: value })} 
              />
            </div>
          </div>

          <div className="control">
            <button type="submit" className="button is-link">Submit</button>
          </div>
        </form>
      </section>
    </main>
  );

};

export default Create;