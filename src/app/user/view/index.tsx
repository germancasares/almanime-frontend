import { Link, useParams } from 'react-router-dom';

import UserApi from 'api/UserApi';
import routes from 'app/routes';

import Loader from 'components/loader';

const View = ({ token }: { token?: string }) => {
  const { name } = useParams<{ name: string }>();

  const { data: me } = UserApi.Me(token);

  if (!me) return (<Loader />);

  return (
    <>
      Hello from View
      {
        name === me.name && (
          <Link to={routes.user.edit.path}>
            Edit
          </Link>
        )
      }
    </>
  );
};

export default View;
