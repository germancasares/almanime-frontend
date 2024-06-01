import { Link } from 'react-router-dom';
import UserApi from '../../../api/UserApi';
import Loader from '../../../components/loader';
import routes from '../../routes';
import './index.scss';

const List = () => {
  const {
    data: users,
    isLoading,
  } = UserApi.Get();

  if (isLoading) return (<Loader />);

  return (
    <main id="user-list">
      <section className="section">
        <h1 className="title">
          User List
        </h1>
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Fansubs</th>
              </tr>
            </thead>
            <tbody>
              {
                users && users.map(({ name, fansubs }) => (
                  <tr key={name}>
                    <td>
                      <Link key={name} to={routes.user.view.to(name)}>
                        {name}
                      </Link>
                    </td>
                    <td>
                      {
                        fansubs.map(({ acronym, name: fansubName }) => (
                          <Link key={acronym} to={routes.fansub.view.to(acronym)}>
                            {fansubName}
                          </Link>
                        ))
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default List;
