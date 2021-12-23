import { DateTime } from 'luxon';
import Helper from './helper';

const DateFull = (date: string | null): string => (
  date === null
    ? ''
    : Helper.StringToDateTime(date).toLocaleString(DateTime.DATE_FULL)
);

const formatter = {
  DateFull,
};

export default formatter;
