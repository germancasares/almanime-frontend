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
  episode: number,
  user: string,
};
