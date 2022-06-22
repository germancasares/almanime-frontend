import Permission from 'enums/Permission';

export type Roles = {
  [name: string]: Permission[],
};

export type RolesDTO = {
  roles: Roles;
  token?: string;
};
