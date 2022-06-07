import FansubApi from 'api/FansubApi';
import routes from 'app/routes';
import Loader from 'components/loader';
import { Link } from 'react-router-dom';

const List = () => {

  const { data: fansubs } = FansubApi.Get();

  if (!fansubs) return (<Loader />);

  return (
    <main>
      {
        fansubs && fansubs.map((fansub) => (
          <div key={fansub.acronym}>
            <Link to={routes.fansub.view.to(fansub.acronym)}>
              <>
                {fansub.acronym} {fansub.name} {fansub.webpage} {fansub.creationDate} {fansub.members}
              </>
            </Link>
          </div>
        ))
      }
    </main>
  );
};

export default List;
