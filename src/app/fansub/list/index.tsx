import { Link } from 'react-router-dom';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

import FansubApi from 'api/FansubApi';
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
        </h1>
        { token && (
          <Link className="button is-primary is-rounded" to={routes.fansub.create.path}>
            <span className="icon">
              <Icon path={mdiPlus} size={1} />
            </span>
            <span>Fansub</span>
          </Link>
        ) }
        {
          fansubs && fansubs.map(({
            acronym, name, webpage, creationDate, members,
          }) => (
            <div key={acronym}>
              <Link to={routes.fansub.view.to(acronym)}>
                {`${acronym} ${name} ${webpage} ${creationDate} ${members}`}
              </Link>
            </div>
          ))
        }
      </section>

    </main>
  );
};

export default List;
