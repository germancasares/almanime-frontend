import { Link } from 'react-router-dom';

import AnimeApi from 'api/AnimeApi';
import routes from 'app/routes';

import Loader from 'components/loader';

const List = () => {
  const { data: animes } = AnimeApi.Get();

  if (!animes) return (<Loader />);

  return (
    <main>
      {
        animes && animes.map(({
          slug, name, season, status, episodes,
        }) => (
          <div key={slug}>
            <Link to={routes.anime.view.to(slug)}>
              {`${name} ${season} ${status} ${episodes}`}
            </Link>
          </div>
        ))
      }
    </main>
  );
};

export default List;
