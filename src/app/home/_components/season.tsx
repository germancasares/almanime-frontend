import Panel from 'components/panel';
import { Anime } from 'types/anime';
import Helper from 'app/helper';
import './season.scss';
import routes from 'app/routes';

type Props = {
  animes: Anime[];
};

const Season = ({ animes }: Props) => {
  const chunks = Helper.Chunk(animes, 4);

  return (
    <div id="season">
      {
        chunks.map((chunk, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`chunk-${index}`} className="tile is-ancestor">
            {chunk.map((anime) => (
              <article key={anime.kitsuID} className="tile is-parent">
                <Panel
                  name={anime.name}
                  image={anime.coverImages?.tiny}
                  to={routes.animeView.to(anime.slug)} />
              </article>
            ))}
          </div>
        ))
      }
    </div>
  );
};

export default Season;
