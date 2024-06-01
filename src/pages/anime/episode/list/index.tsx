import { Link, useParams } from 'react-router-dom';
import EpisodeApi from '../../../../api/EpisodeApi';
import Loader from '../../../../components/loader';
import routes from '../../../routes';

const List = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: episodes } = EpisodeApi.GetByAnimeSlug(slug);

  if (!slug) return (<Loader />);

  return (
    <main>
      {
        episodes && episodes.map(({
          number, name, duration, aired,
        }) => (
          <div key={number}>
            <Link to={routes.episode.view.to(slug, number.toString())}>
              {`${number} ${name} ${duration} ${aired}`}
            </Link>
          </div>
        ))
      }
    </main>
  );
};

export default List;
