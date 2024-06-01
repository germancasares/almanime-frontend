import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import FansubApi from '../../../api/FansubApi';
import Loader from '../../../components/loader';
import Formatter from '../../../formatter';
import routes from '../../routes';
import './index.scss';

const List = ({ accessToken }: { accessToken?: string }) => {
  const { data: fansubs } = FansubApi.Get();

  if (!fansubs) return (<Loader />);

  return (
    <main id="fansub-list">
      <section className="section">
        <h1 className="title">
          Fansubs List
          {
            accessToken && (
              <Link className="button is-primary is-rounded" to={routes.fansub.create.path}>
                <span className="icon">
                  <Icon path={mdiPlus} size={1} />
                </span>
                <span>Fansub</span>
              </Link>
            )
          }
        </h1>
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Acronym</th>
                <th>Name</th>
                <th>Webpage</th>
                <th>Creation Date</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {
                fansubs && fansubs.map(({
                  acronym, name, webpage, creationDate, members,
                }) => (
                  <tr key={acronym}>
                    <td>
                      <Link to={routes.fansub.view.to(acronym)}>
                        {acronym}
                      </Link>
                    </td>
                    <td>{name}</td>
                    <td>{webpage}</td>
                    <td>{Formatter.DateFull(creationDate.toString())}</td>
                    <td>{members}</td>
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
