import { DateTime } from 'luxon';

import AnimeStatus from 'enums/AnimeStatus';
import Season from 'enums/Season';

import { Episode } from './episode';
import { SizedImage } from './sizedImage';

export type Anime = {
  id: string;

  kitsuID: number;
  myAnimeListID?: number;
  aniListID?: number;
  aniDBID?: number;
  slug: string;
  name: string;
  season: Season;
  status: AnimeStatus;
  synopsis: string;
  startDate: string | null;

  coverImages?: SizedImage;
  posterImages?: SizedImage;
};

export type AnimeWithExtra = {
  slug: string;
  name: string;
  season: Season;
  status: AnimeStatus;
  episodes: number;
  coverImages?: SizedImage;
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

export type AnimeDocument = {
  id: string;
  creationDate: DateTime;
  slug: string;
  name: string;
};
