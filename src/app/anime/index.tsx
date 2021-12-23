import { useParams } from 'react-router-dom';
import Hero from 'components/hero';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'app/store';
import { useEffect } from 'react';
import Helper from 'app/helper';
import AnimeCoverSize from 'enums/AnimeCoverSize';
import Poster from 'components/poster';
import AnimePosterSize from 'enums/AnimePostersize';
import Info from './_components/info';
import { getAnimeBySlug } from './store/actions';
import { clearAnime } from './store/reducers';
import Episodes from './_components/episodes';

import './index.scss';

const Anime = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();

  const dispatch = useDispatch();
  const anime = useSelector((state: State) => state.anime.anime);

  useEffect(() => {
    dispatch(getAnimeBySlug(slug));

    return () => {
      dispatch(clearAnime());
    };
  }, [dispatch, slug]);

  return (
    <div id="anime">
      <Hero
        image={Helper.ResizeImageOrDefault(anime.coverImage, AnimeCoverSize.Small)}
        season={anime.season}
      />
      <div className="container">
        <div className="columns">
          <aside className="column is-narrow">
            <Poster image={Helper.ResizeImageOrDefault(anime.posterImage, AnimePosterSize.Small)} />
            <Info anime={anime} />
          </aside>
          <main>
            <section className="column">
              <h1 className="title is-size-3 has-text-weight-semibold">
                {anime.name}
              </h1>
              <p>{anime.synopsis}</p>
              {
                anime.episodes.length > 0
                && (<Episodes episodes={anime.episodes} />)
              }
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Anime;
