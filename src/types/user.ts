import Permission from 'enums/Permission';

export type User = {
  name: string,
  permissions: {
    [fansub: string]: Permission
  }
};