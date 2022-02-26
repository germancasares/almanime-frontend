import Permission from 'enums/Permission';
import Season from 'enums/Season';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { User } from 'types/user';

const StringToDateTime = (date: string) => DateTime.fromISO(date, { zone: 'utc' });
const HasPermission = (permission: Permission, fansub: string, user?: User) => 
  user && user.permissions[fansub]?.includes(permission);

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

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

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



const Helper = {
  Chunk,
  GetSeason,
  HasPermission,
  StringToDateTime,
  useDebounce,

  LocalStorage: {
    Create: CreateLocalStorage,
    Get: GetLocalStorage,
    Delete: DeleteLocalStorage,
  },
};

export default Helper;
