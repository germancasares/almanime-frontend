import AnimeApi from 'api/AnimeApi';
import routes from 'app/routes';
import Loader from 'components/loader';
import { Link } from 'react-router-dom';

const List = () => {

  const { data: animes } = AnimeApi.Get();

  if (!animes) return (<Loader />);

  return (
    <main>
      {
        animes && animes.map((anime) => (
          <div key={anime.slug}>
            <Link to={routes.anime.view.to(anime.slug)}>
              {anime.name} {anime.season} {anime.status} {anime.episodes}
            </Link>
          </div>
        ))
      }
    </main>
  );
};

export default List;
