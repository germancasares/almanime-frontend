import { Link } from 'react-router-dom';

import UserApi from 'api/UserApi';
import routes from 'app/routes';

import Loader from 'components/loader';

const List = () => {
  const {
    data: users,
    isLoading,
  } = UserApi.Get();

  if (isLoading) return (<Loader />);

  return (
    <main>
      {
        users && users.map(({ name }) => (
          <Link key={name} to={routes.user.view.to(name)}>
            {name}
          </Link>
        ))
      }
    </main>
  );
};

export default List;
