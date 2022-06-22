import UserApi from 'api/UserApi';
import routes from 'app/routes';
import Loader from 'components/loader';
import { Link } from 'react-router-dom';

const List = () => {
  const { data: users } = UserApi.Get();

  if (!users) return (<Loader />);

  return (
    <>
      {
        users.map(({ name }) => (
          <Link key={name} to={routes.user.view.to(name)}>
            {name}
          </Link>
        ))
      }
    </>
  );
};

export default List;
