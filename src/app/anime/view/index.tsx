import { useParams } from 'react-router-dom';

import AnimeApi from 'api/AnimeApi';
import EpisodeApi from 'api/EpisodeApi';

import Loader from 'components/loader';
import Hero from 'components/hero';
import Poster from 'components/poster';
import Info from './_components/info';
import Episodes from './_components/episodes';

import './index.scss';

const View = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: anime } = AnimeApi.GetBySlug(slug);
  const { data: episodes } = EpisodeApi.GetByAnimeSlug(slug);
  const { data: episodeFansubs } = EpisodeApi.GetFansubs(slug);

  if (!anime || !episodes || !episodeFansubs) return (<Loader />);

  return (
    <main id="anime">
      <Hero
        image={anime.coverImages?.small}
        season={anime.season}
      />
      <div className="container">
        <div className="columns">
          <aside className="column is-narrow">
            <Poster image={anime.posterImages?.small} />
            <Info anime={anime} episodesCount={episodes.length} />
          </aside>
          <section className="column">
            <h1 className="title is-size-3 has-text-weight-semibold">
              {anime.name}
            </h1>
            <p>
              {anime.synopsis}
            </p>
            {
              episodes.length > 0 && (<Episodes episodes={episodes} episodeFansubs={episodeFansubs} />)
            }
          </section>
        </div>
      </div>
    </main>
  );
};

export default View;
