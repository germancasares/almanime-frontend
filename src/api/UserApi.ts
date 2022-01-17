import { Duration } from 'luxon';
import { useQuery } from 'react-query';
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

}