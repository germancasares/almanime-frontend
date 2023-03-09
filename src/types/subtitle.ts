import { DateTime } from 'luxon';

import SubtitleFormat from 'enums/SubtitleFormat';

export type SubtitleDTO = {
  fansubAcronym: string;
  animeSlug: string;
  episodeNumber: number | string;
  file: File;
};

export type Subtitle = {
  id: string,
  url: string,
  format: SubtitleFormat,
  creationDate: DateTime,
  anime: string,
  animeSlug: string,
  episode: number,
  user: string,
};

export type EpisodeSubtitle = {
  acronym: string,
  url: string,
};

export type AnimeSubtitles = {
  [episode: number]: EpisodeSubtitle[],
};
