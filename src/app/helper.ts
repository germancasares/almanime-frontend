import AnimeCoverSize from 'enums/AnimeCoverSize';
import AnimePosterSize from 'enums/AnimePostersize';
import Season from 'enums/Season';
import { DateTime } from 'luxon';
import { ChangeEvent } from 'react';

const GetSeason = (month: number | DateTime): Season => {
  if (month instanceof DateTime) {
    // eslint-disable-next-line no-param-reassign
    month = month.month;
  }

  switch (true) {
    case month === 12 || month <= 2:
      return Season.Winter;
    case month >= 3 && month <= 5:
      return Season.Spring;
    case month >= 6 && month <= 8:
      return Season.Summer;
    case month >= 9 && month <= 11:
      return Season.Fall;
    default: throw new RangeError('Month out of valid range.');
  }
};

const Chunk = <T>(collection: T[], columns = 2): T[][] => {
  const chunks = [];

  for (let index = 0; index < collection.length; index += columns) {
    chunks.push(collection.slice(index, columns + index));
  }

  return chunks;
};

const ResizeImageOrDefault = (
  image: URL | null,
  size: AnimeCoverSize | AnimePosterSize,
): string | undefined => (image === null ? undefined : `${image.toString()}${size}.jpg`);

const StringToDateTime = (date: string): DateTime => DateTime.fromISO(date, { zone: 'utc' });

// #region LocalStorage

const GetLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (item === null) {
    return null;
  }

  return JSON.parse(item);
};

const CreateLocalStorage = (key: string, value: unknown): void => localStorage.setItem(key, JSON.stringify(value));

const DeleteLocalStorage = (key: string): void => localStorage.removeItem(key);

// #endregion

// #region Event

const GetValue = ({
  target: {
    value,
  },
}: ChangeEvent<HTMLInputElement | HTMLSelectElement>): string => value;

// #endregion

const Helper = {
  GetSeason,
  Chunk,
  ResizeImageOrDefault,
  StringToDateTime,

  LocalStorage: {
    Create: CreateLocalStorage,
    Get: GetLocalStorage,
    Delete: DeleteLocalStorage,
  },

  Event: {
    GetValue,
  },
};

export default Helper;
