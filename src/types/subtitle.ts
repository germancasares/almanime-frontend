import SubtitleFormat from 'enums/SubtitleFormat';
import { DateTime } from 'luxon';

export type SubtitleDTO = {
  fansubAcronym: string;
  animeSlug: string;
  episodeNumber: number;
  file: File;
};

export type Subtitle = {
  id: string,
  url: string,
  format: SubtitleFormat,
  creationDate: DateTime,
  anime: string,
  episode: number,
  user: string,
};