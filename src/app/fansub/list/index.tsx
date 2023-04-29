import { Link } from 'react-router-dom';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

import FansubApi from 'api/FansubApi';
import Formatter from 'app/formatter';
import routes from 'app/routes';

import Loader from 'components/loader';

import './index.scss';

const List = ({ token }: { token?: string }) => {
  const { data: fansubs } = FansubApi.Get();

  if (!fansubs) return (<Loader />);

  return (
    <main id="fansub-list">
      <section className="section">
        <h1 className="title">
          Fansubs List
          {
            token && (
              <Link className="button is-primary is-rounded" to={routes.fansub.create.path}>
                <span className="icon">
                  <Icon path={mdiPlus} size={1} />
                </span>
                <span>Fansub</span>
              </Link>
            )
          }
        </h1>
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

      </section>

    </main>
  );
};

export default List;
