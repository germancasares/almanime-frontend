import { Link } from 'react-router-dom';

import AnimeApi from 'api/AnimeApi';
import routes from 'app/routes';

import Loader from 'components/loader';

import './index.scss';

const Favorites = ({ accessToken }: { accessToken?: string }) => {
  const { data: animes } = AnimeApi.GetByBookmarked(accessToken);

  if (!animes) return (<Loader />);

  return (
    <main id="favorites" className="container">
      <section className="column is-narrow">
        <h3 className="title">Favorites</h3>
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
      </section>
    </main>
  );
};

export default Favorites;
