import Formatter from 'app/formatter';
import { Anime } from 'types/anime';
import Kitsu from 'assets/kitsu.png';
import './info.scss';

type Props = {
  anime: Anime,
  episodesCount: number,
};

const Info = ({ anime, episodesCount }: Props) => (
  <div className="info">
    <div className="details">
      <span className="is-size-5 has-text-weight-semibold">
        Details:
      </span>
    </div>

    <ul>
      {
        episodesCount > 0 && (
          <li>
            <span className="has-text-weight-bold">Episodes:</span>
            <span>{episodesCount}</span>
          </li>
        )
      }
      <li>
        <span className="has-text-weight-bold">Status:</span>
        <span>{anime.status}</span>
      </li>
      <li>
        <span className="has-text-weight-bold">Aired:</span>
        <span>{Formatter.DateFull(anime.startDate)}</span>
      </li>
      <li>
        <span className="has-text-weight-bold">Season:</span>
        <span>{anime.season}</span>
      </li>
      <li className="links">
        <span className="has-text-weight-bold">Links:</span>
        <a href={`https://kitsu.io/anime/${anime.slug}`} target="_blank" rel="noreferrer">
          <img src={Kitsu} alt="" />
        </a>
      </li>
    </ul>
  </div>
);

export default Info;
