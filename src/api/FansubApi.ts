import { Duration } from 'luxon';
import { useMutation, useQuery } from 'react-query';
import { Fansub } from 'types/fansub';
import { Member } from 'types/member';
import { Subtitle } from 'types/subtitle';

export default class FansubApi {

  public static GetByAcronym = (
    acronym?: string,
  ) => useQuery<Fansub>(
    ['fansub', acronym],
    async () => (await fetch(`fansub/acronym/${acronym}`)).json(),
    {
      enabled: !!acronym,
      staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
    },
  );

  public static IsMember = (
    acronym?: string,
    token?: string,
  ) => useQuery<boolean>(
    ['isMember', acronym],
    async () => (await fetch(
      `fansub/acronym/${acronym}/isMember`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      },
    )).json(),
    {
      enabled: !!acronym && !!token,
      staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
    },
  );

  public static GetMembers = (
    acronym?: string,
  ) => useQuery<Member[]>(
    ['members', acronym],
    async () => (await fetch(`fansub/acronym/${acronym}/members`)).json(),
    {
      enabled: !!acronym,
      staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
    },
  );

  public static GetSubtitles = (
    acronym?: string,
  ) => useQuery<Subtitle[]>(
    ['subtitles', acronym],
    async () => (await fetch(`fansub/acronym/${acronym}/subtitles`)).json(),
    {
      enabled: !!acronym,
      staleTime: Duration.fromObject({ minutes: 30 }).toMillis(),
    },
  );

  public static Post = () => useMutation(
    async ({ fansub, token } : { fansub: Fansub, token?: string }) =>  (await fetch('fansub', {
      method: 'POST',
      body: JSON.stringify(fansub),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })).json(),
  );

}