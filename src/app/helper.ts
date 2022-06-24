import { useEffect, useState } from 'react';
import { DateTime, Duration, DurationLikeObject } from 'luxon';

import Permission from 'enums/Permission';
import Season from 'enums/Season';
import { User } from 'types/user';

const StringToDateTime = (date: string) => DateTime.fromISO(date, { zone: 'utc' });
const HasPermission = (
  permission: Permission,
  fansub: string,
  user?: User,
) => user && user.permissions[fansub]?.includes(permission);

const GetSeason = (month: number | DateTime): Season => {
  if (month instanceof DateTime) {
    // eslint-disable-next-line no-param-reassign
    month = month.month;
  }

  switch (true) {
    case month >= 1 && month <= 3:
      return Season.Winter;
    case month >= 4 && month <= 6:
      return Season.Spring;
    case month >= 7 && month <= 9:
      return Season.Summer;
    case month >= 10 && month <= 12:
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

// https://github.com/moment/luxon/issues/1134#issue-1128331010
const toHuman = (dur: Duration, smallestUnit: keyof DurationLikeObject = 'seconds'): string => {
  const units: (keyof DurationLikeObject)[] = [
    'years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds',
  ];
  const smallestIdx = units.indexOf(smallestUnit);
  const entries = Object.entries(
    dur.shiftTo(...units).normalize().toObject(),
  ).filter(([_unit, amount], idx) => amount > 0 && idx <= smallestIdx);
  const dur2 = Duration.fromObject(
    entries.length === 0 ? { [smallestUnit]: 0 } : Object.fromEntries(entries),
  );
  return dur2.toHuman();
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
  toHuman,

  LocalStorage: {
    Create: CreateLocalStorage,
    Get: GetLocalStorage,
    Delete: DeleteLocalStorage,
  },
};

export default Helper;
