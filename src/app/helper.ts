import AnimeCoverSize from 'enums/AnimeCoverSize';
import AnimePosterSize from 'enums/AnimePostersize';
import Season from 'enums/Season';
import { DateTime } from 'luxon';

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
  image: URL | undefined,
  size: AnimeCoverSize | AnimePosterSize,
): string | undefined => (image === undefined ? undefined : `${image.toString()}${size}.jpg`);

const Helper = {
  GetSeason,
  Chunk,
  ResizeImageOrDefault,
};

export default Helper;
