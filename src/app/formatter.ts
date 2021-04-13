import { DateTime } from 'luxon';
import Helper from './helper';

const DateFull = (date: string): string | undefined => (
  date === undefined
    ? ''
    : Helper.StringToDateTime(date).toLocaleString(DateTime.DATE_FULL)
);

const formatter = {
  DateFull,
};

export default formatter;
