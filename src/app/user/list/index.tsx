import UserApi from 'api/UserApi';
import Loader from 'components/loader';

const List = () => {

  const { data: users } = UserApi.Get();

  if (!users) return (<Loader />);

  return (
    <>
      {
        users && users.map((user) => (
          <div key={user.name}>
            {user.name}
          </div>
        ))
      }
    </>
  );
};

export default List;
