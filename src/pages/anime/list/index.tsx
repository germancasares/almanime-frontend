import { Link } from 'react-router-dom';
import AnimeApi from '../../../api/AnimeApi';
import Loader from '../../../components/loader';
import routes from '../../routes';
import './index.scss';

const List = () => {
  const { data: animes, isLoading } = AnimeApi.Get();

  if (isLoading) return (<Loader />);

  return (
    <main id="anime-list">
      <section className="section">
        <h1 className="title">
          Anime List
        </h1>
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Anime</th>
                <th>Season</th>
                <th>Status</th>
                <th>Episodes</th>
              </tr>
            </thead>
            <tbody>
              {
                animes && animes.sort((a, b) => (a.name > b.name ? 1 : -1)).map(({
                  slug, name, season, status, episodes,
                }) => (
                  <tr key={slug}>
                    <td>
                      <Link to={routes.anime.view.to(slug)}>
                        {name}
                      </Link>
                    </td>
                    <td>{season}</td>
                    <td>{status}</td>
                    <td>{episodes}</td>
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
