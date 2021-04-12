import { useParams } from 'react-router-dom';
import Hero from 'app/components/hero';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'app/store';
import { useEffect } from 'react';
import Helper from 'app/helper';
import AnimeCoverSize from 'enums/AnimeCoverSize';
import { getAnimeBySlug } from './store/actions';

import './index.scss';

const Anime = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();

  const dispatch = useDispatch();
  const anime = useSelector((state: State) => state.anime.anime);

  useEffect(() => {
    dispatch(getAnimeBySlug(slug));
  }, [dispatch, slug]);

  return (
    <main id="anime">
      <Hero
        image={Helper.ResizeImageOrDefault(anime.coverImage, AnimeCoverSize.Small)}
        season={anime.season}
      />
      {anime.name}
    </main>
  );
};

export default Anime;
