import Panel from 'app/components/panel';
import Anime from 'types/Anime';
import Helper from 'app/helper';
import './season.scss';
import AnimeCoverSize from 'enums/AnimeCoverSize';

type Props = {
  animes: Anime[];
};

const Season = ({ animes }: Props): JSX.Element => {
  const chunks = Helper.Chunk(animes, 4);

  return (
    <div id="season">
      {
        chunks.map((chunk, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`chunk-${index}`} className="tile is-ancestor">
            {chunk.map((anime) => (
              <div key={anime.kitsuID} className="tile is-parent">
                <Panel
                  name={anime.name}
                  image={Helper.ResizeImageOrDefault(anime.coverImage, AnimeCoverSize.Tiny)}
                />
              </div>
            ))}
          </div>
        ))
      }
      {/* <div className="tile is-3 h10" />
      <div className="tile is-3" />
      <div className="tile is-3" />
      <div className="tile is-3" />
      <div className="tile is-3" />
      <div className="tile is-3" />
      <div className="tile is-3" /> */}
    </div>
  );
};

export default Season;
