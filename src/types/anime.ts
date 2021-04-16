import AnimeStatus from 'enums/AnimeStatus';
import Season from 'enums/Season';
import Episode from './episode';

type Anime = {
  id: string;

  kitsuID: number;
  slug: string;
  name: string;
  season: Season;
  status: AnimeStatus;
  synopsis: string;
  startDate: string | null;

  coverImage: URL | null;
  posterImage: URL | null;
};

export type AnimeWithEpisodes = Anime & {
  episodes: Episode[];
};

export type AnimeIndex = {
  kitsuID: number;
  slug: string;
  name: string;
  season: Season;
  status: AnimeStatus;
};

export default Anime;
