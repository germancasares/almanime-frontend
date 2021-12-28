import AnimeCoverSize from 'enums/AnimeCoverSize';
import AnimePosterSize from 'enums/AnimePostersize';
import Season from 'enums/Season';
import { DateTime } from 'luxon';
import { ChangeEvent } from 'react';


const GetSeason = (date: DateTime): Season => {
  const spring = DateTime.local(date.year, 3, 1);
  const summer = DateTime.local(date.year, 6, 1);
  const fall = DateTime.local(date.year, 9, 1);
  const winter = DateTime.local(date.year, 12, 1);

  switch (true) {
    case date >= spring && date < summer:
      return Season.Spring;
    case date >= summer && date < fall:
      return Season.Summer;
    case date >= fall && date < winter:
      return Season.Fall;
    case date >= winter && date < spring.plus({ years: 1 }):
      return Season.Winter;
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
