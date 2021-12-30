import { useParams } from 'react-router-dom';
import Hero from 'components/hero';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'app/store';
import { useEffect } from 'react';
import Poster from 'components/poster';
import Info from './_components/info';
import { getAnimeBySlug, getEpisodesByAnimeSlug } from './store/actions';
import { clearAnime, clearEpisodes } from './store/reducers';

import './index.scss';
import Episodes from './_components/episodes';

const Anime = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();

  const dispatch = useDispatch();
  const anime = useSelector((state: State) => state.anime.anime);
  const episodes = useSelector((state: State) => state.anime.episodes);

  useEffect(() => {
    if (slug === undefined) return;

    dispatch(getAnimeBySlug(slug));
    dispatch(getEpisodesByAnimeSlug(slug));

    return () => {
      dispatch(clearAnime());
      dispatch(clearEpisodes());
    };
  }, [dispatch, slug]);

  return (
    <div id="anime">
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
          <main>
            <section className="column">
              <h1 className="title is-size-3 has-text-weight-semibold">
                {anime.name}
              </h1>
              <p>{anime.synopsis}</p>
              {
                episodes.length > 0 && (<Episodes episodes={episodes} />)
              }
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Anime;
