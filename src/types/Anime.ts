import AnimeStatus from 'enums/AnimeStatus';
import Season from 'enums/Season';

import { DateTime } from 'luxon';

type Anime = {
  id: string;

  kitsuID: number;
  slug: string;
  name: string;
  season: Season;
  status: AnimeStatus;
  synopsis: string;
  startDate: DateTime;

  coverImage: URL | null;
  posterImage: URL | null;
};

export default Anime;
