import EpisodeApi from 'api/EpisodeApi';
import routes from 'app/routes';
import Loader from 'components/loader';
import { Link, useParams } from 'react-router-dom';

const List = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: episodes } = EpisodeApi.GetByAnimeSlug(slug);

  if (!slug) return (<Loader />);

  return (
    <main>
      {
        episodes && episodes.map((episode) => (
          <div key={episode.number}>
            <Link to={routes.episode.view.to(slug, episode.number.toString())}>
              {episode.number} {episode.name} {episode.duration} {episode.aired}
            </Link>
          </div>
        ))
      }
    </main>
  );
};

export default List;
