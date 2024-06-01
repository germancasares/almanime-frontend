import { DateTime } from "luxon";
import Helper from "./helper";
import SubtitleLanguage from "./enums/SubtitleLanguage";

const DateFull = (date: string | null): string =>
  date === null
    ? ""
    : Helper.StringToDateTime(date).toLocaleString(DateTime.DATE_FULL);

const flags = {
  [SubtitleLanguage.Japanese]: "🇯🇵",
  [SubtitleLanguage.English]: "🇺🇸",
  [SubtitleLanguage.SpanishCastilian]: "🇪🇸",
  [SubtitleLanguage.SpanishLatin]: "🇲🇽",
};

const Formatter = {
  DateFull,
  LanguageFlag: (language: SubtitleLanguage) => flags[language],
};

export default Formatter;
