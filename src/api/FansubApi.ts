import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Duration } from 'luxon';

import { Fansub, FansubDocument, FansubDTO } from 'types/fansub';
import { Member } from 'types/member';
import { Roles, RolesDTO } from 'types/role';
import { Subtitle } from 'types/subtitle';

export default class FansubApi {
  public static Get = () => useQuery<Fansub[]>(
    ['fansubs'],
    async () => (await fetch('fansub')).json(),
    {
      staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
    },
  );

  public static Search = (
    fansubName?: string,
  ) => useQuery<FansubDocument[]>(
    ['search', fansubName],
    async () => {
      if (fansubName === '') return [];
      return (await fetch(`fansub/search/${fansubName}`)).json();
    },
    {
      staleTime: 0,
      enabled: !!fansubName,
    },
  );

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
    ['isMember', acronym, token],
    async () => (await fetch(
      `fansub/acronym/${acronym}/isMember`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

  public static GetSubtitlesDrafts = (
    acronym?: string,
    token?: string,
  ) => useQuery<Subtitle[]>(
    ['subtitles', acronym, token],
    async () => (await fetch(`fansub/acronym/${acronym}/subtitles/drafts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).json(),
    {
      enabled: !!acronym && !!token,
      staleTime: Duration.fromObject({ minutes: 30 }).toMillis(),
    },
  );

  public static GetRoles = (
    acronym?: string,
    token?: string,
  ) => useQuery<Roles>(
    ['roles', acronym, token],
    async () => (await fetch(`fansub/acronym/${acronym}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).json(),
    {
      enabled: !!acronym && !!token,
      staleTime: Duration.fromObject({ minutes: 30 }).toMillis(),
    },
  );

  public static Post = () => useMutation(
    async ({ fansub, token } : { fansub: FansubDTO, token?: string }) => (await fetch('fansub', {
      method: 'POST',
      body: JSON.stringify(fansub),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })).json(),
  );

  public static UpdateRoles = (acronym?: string) => {
    const queryClient = useQueryClient();

    return useMutation(
      async ({ roles, token }: RolesDTO) => fetch(`fansub/acronym/${acronym}/roles`, {
        method: 'PUT',
        body: JSON.stringify(roles),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
      {
        onMutate: async (newRoles: RolesDTO) => {
          await queryClient.cancelQueries(['roles', acronym]);
          const roles = queryClient.getQueryData<Roles>(['roles', acronym]);

          if (roles) {
            queryClient.setQueryData<Roles>(
              ['roles', acronym],
              newRoles.roles,
            );
          }

          return { roles };
        },
        onError: (_error, _newRoles, context) => {
          if (context?.roles) {
            queryClient.setQueryData<Roles>(['roles', acronym], context.roles);
          }
        },
      },
    );
  };

  public static Join = () => useMutation(
    async ({ acronym, token } : { acronym: string, token?: string }) => fetch(`fansub/acronym/${acronym}/join`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }),
  );
}
