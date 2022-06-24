import { useMutation, useQuery } from 'react-query';
import { Duration } from 'luxon';

import { User, UserDocument } from 'types/user';

export default class UserApi {
  public static Get = () => useQuery<User[]>(
    ['users'],
    async () => (await fetch('user')).json(),
    {
      staleTime: Duration.fromObject({ days: 1 }).toMillis(),
    },
  );

  public static Search = (
    userName?: string,
  ) => useQuery<UserDocument[]>(
    ['search', userName],
    async () => (await fetch(`user/search/${userName}`)).json(),
    {
      staleTime: 0,
      enabled: !!userName,
    },
  );

  public static Me = (
    token?: string,
    retry: boolean | number = 3,
  ) => useQuery<User>(
    ['me', token],
    async () => (await fetch(
      'user/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )).json(),
    {
      retry,
      enabled: !!token,
      staleTime: Duration.fromObject({ day: 1 }).toMillis(),
    },
  );

  public static Create = () => useMutation(
    async ({ user, token } : { user: User, token?: string }) => (fetch('user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })),
  );

  public static Update = () => useMutation(
    async ({ user, token } : { user: User, token?: string }) => (fetch('user', {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })),
  );
}
