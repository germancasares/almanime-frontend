import { Link } from 'react-router-dom';

import FansubApi from 'api/FansubApi';
import routes from 'app/routes';

import Loader from 'components/loader';

const List = () => {
  const { data: fansubs } = FansubApi.Get();

  if (!fansubs) return (<Loader />);

  return (
    <main>
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
    </main>
  );
};

export default List;
