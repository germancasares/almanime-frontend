import { DateTime } from 'luxon';
import SubtitleLanguage from '../enums/SubtitleLanguage';
import SubtitleFormat from '../enums/SubtitleFormat';

export type SubtitleDTO = {
  fansubAcronym: string;
  animeSlug: string;
  episodeNumber: number | string;
  language: SubtitleLanguage;
  file: File;
};

export type Subtitle = {
  id: string,
  url: string,
  format: SubtitleFormat,
  language: SubtitleLanguage,
  creationDate: DateTime,
  anime: string,
  animeSlug: string,
  episode: number,
  user: string,
};

export type EpisodeSubtitle = {
  acronym: string,
  url: string,
  language: SubtitleLanguage,
};

export type AnimeSubtitles = {
  [episode: number]: EpisodeSubtitle[],
};
