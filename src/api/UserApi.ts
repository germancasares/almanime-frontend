import { Duration } from 'luxon';
import { useMutation, useQuery } from 'react-query';
import { User } from 'types/user';

export default class UserApi {

  public static Get = (
  ) => useQuery<User[]>(
    ['users'],
    async () => (await fetch('user')).json(),
    {
      staleTime: Duration.fromObject({ days: 1 }).toMillis(),
    },
  );

  public static Me = (
    token?: string,
  ) => useQuery(
    ['me', token],
    async () => (await fetch(
      'user/me',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      },
    )).json(),
    {
      enabled: !!token,
      staleTime: Duration.fromObject({ day: 1 }).toMillis(),
    },
  );

  public static Post = () => useMutation(
    async ({ user, token } : { user: User, token?: string }) =>  (await fetch('user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })).json(),
  );
}