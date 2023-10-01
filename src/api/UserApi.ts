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
    accessToken?: string,
    retry: boolean | number = 3,
  ) => useQuery<User>(
    ['me', accessToken],
    async () => (await fetch(
      'user/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )).json(),
    {
      retry,
      enabled: !!accessToken,
      staleTime: Duration.fromObject({ day: 1 }).toMillis(),
    },
  );

  public static Create = () => useMutation(
    async ({ user, accessToken } : { user: User, accessToken?: string }) => (fetch('user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })),
  );

  public static Update = () => useMutation(
    async ({ user, accessToken } : { user: User, accessToken?: string }) => (fetch('user', {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })),
  );
}
