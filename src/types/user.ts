import { DateTime } from 'luxon';

import Permission from 'enums/Permission';

export type User = {
  name: string,
  permissions: {
    [fansub: string]: Permission
  }
};

export type UserDocument = {
  id: string;
  creationDate: DateTime;
  name: string;
};
