import { DateTime } from 'luxon';

import SubtitleLanguage from 'enums/SubtitleLanguage';

import Helper from './helper';

const DateFull = (date: string | null): string => (
  date === null
    ? ''
    : Helper.StringToDateTime(date).toLocaleString(DateTime.DATE_FULL)
);

const flags = {
  [SubtitleLanguage.Japanese]: '🇯🇵',
  [SubtitleLanguage.English]: '🇺🇸',
  [SubtitleLanguage.SpanishCastilian]: '🇪🇸',
  [SubtitleLanguage.SpanishLatin]: '🇲🇽',
};

const formatter = {
  DateFull,
  LanguageFlag: (language: SubtitleLanguage) => flags[language],
};

export default formatter;
