import AniDB from '../../../../assets/anidb.png';
import AniList from '../../../../assets/anilist.png';
import Kitsu from '../../../../assets/kitsu.png';
import MyAnimeList from '../../../../assets/mal.png';
import Formatter from '../../../../formatter';
import { Anime } from '../../../../types/anime';
import './info.scss';

type Props = {
  anime: Anime,
  episodesCount: number,
};

const Info = ({ anime, episodesCount }: Props) => (
  <div id="info">
    <div className="details">
      <span className="is-size-5 has-text-weight-semibold">
        Details
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
        {
          anime.myAnimeListID && (
            <a href={`https://myanimelist.net/anime/${anime.myAnimeListID}`} target="_blank" rel="noreferrer">
              <img src={MyAnimeList} alt="" />
            </a>
          )
        }
        {
          anime.aniListID && (
            <a href={`https://anilist.co/anime/${anime.aniListID}`} target="_blank" rel="noreferrer">
              <img src={AniList} alt="" />
            </a>
          )
        }
        {
          anime.aniDBID && (
            <a href={`https://anidb.net/anime/${anime.aniDBID}`} target="_blank" rel="noreferrer">
              <img src={AniDB} alt="" />
            </a>
          )
        }
      </li>
    </ul>
  </div>
);

export default Info;
