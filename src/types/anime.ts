import AnimeStatus from 'enums/AnimeStatus';
import Season from 'enums/Season';

type Anime = {
  id: string;

  kitsuID: number;
  slug: string;
  name: string;
  season: Season;
  status: AnimeStatus;
  synopsis: string;
  startDate: string;

  coverImage: URL | null;
  posterImage: URL | null;
};

export default Anime;
