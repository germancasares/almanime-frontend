import { Duration } from "luxon";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Fansub, FansubDTO, FansubDocument } from "../types/fansub";
import { Member } from "../types/member";
import { Roles, RolesDTO } from "../types/role";
import { Subtitle } from "../types/subtitle";

export default class FansubApi {
  public static Get = () =>
    useQuery<Fansub[]>(
      ["fansubs"],
      async () => (await fetch("fansub")).json(),
      {
        staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
      },
    );

  public static Search = (fansubName?: string) =>
    useQuery<FansubDocument[]>(
      ["search", fansubName],
      async () => {
        if (fansubName === "") return [];
        return (await fetch(`fansub/search/${fansubName}`)).json();
      },
      {
        staleTime: 0,
        enabled: !!fansubName,
      },
    );

  public static GetByAcronym = (acronym?: string) =>
    useQuery<Fansub>(
      ["fansub", acronym],
      async () => (await fetch(`fansub/acronym/${acronym}`)).json(),
      {
        enabled: !!acronym,
        staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
      },
    );

  public static IsMember = (acronym?: string, accessToken?: string) =>
    useQuery<boolean>(
      ["isMember", acronym, accessToken],
      async () =>
        (
          await fetch(`fansub/acronym/${acronym}/isMember`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        ).json(),
      {
        enabled: !!acronym && !!accessToken,
        staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
      },
    );

  public static GetMembers = (acronym?: string) =>
    useQuery<Member[]>(
      ["members", acronym],
      async () => (await fetch(`fansub/acronym/${acronym}/members`)).json(),
      {
        enabled: !!acronym,
        staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
      },
    );

  public static GetPublishedSubtitles = (acronym?: string) =>
    useQuery<Subtitle[]>(
      ["subtitles", "published", acronym],
      async () => (await fetch(`fansub/acronym/${acronym}/subtitles`)).json(),
      {
        enabled: !!acronym,
        staleTime: Duration.fromObject({ minutes: 30 }).toMillis(),
      },
    );

  public static GetSubtitlesDrafts = (acronym?: string, accessToken?: string) =>
    useQuery<Subtitle[]>(
      ["subtitles", "drafts", acronym, accessToken],
      async () =>
        (
          await fetch(`fansub/acronym/${acronym}/subtitles/drafts`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        ).json(),
      {
        enabled: !!acronym && !!accessToken,
        staleTime: Duration.fromObject({ minutes: 30 }).toMillis(),
      },
    );

  public static GetRoles = (acronym?: string, accessToken?: string) =>
    useQuery<Roles>(
      ["roles", acronym, accessToken],
      async () =>
        (
          await fetch(`fansub/acronym/${acronym}/roles`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        ).json(),
      {
        enabled: !!acronym && !!accessToken,
        staleTime: Duration.fromObject({ minutes: 30 }).toMillis(),
      },
    );

  public static Post = () =>
    useMutation(
      async ({
        fansub,
        accessToken,
      }: {
        fansub: FansubDTO;
        accessToken?: string;
      }) =>
        (
          await fetch("fansub", {
            method: "POST",
            body: JSON.stringify(fansub),
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          })
        ).json(),
    );

  public static UpdateRoles = (acronym?: string) => {
    const queryClient = useQueryClient();

    return useMutation(
      async ({ roles, accessToken }: RolesDTO) =>
        fetch(`fansub/acronym/${acronym}/roles`, {
          method: "PUT",
          body: JSON.stringify(roles),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }),
      {
        onMutate: async (newRoles: RolesDTO) => {
          await queryClient.cancelQueries(["roles", acronym]);
          const roles = queryClient.getQueryData<Roles>(["roles", acronym]);

          if (roles) {
            queryClient.setQueryData<Roles>(["roles", acronym], newRoles.roles);
          }

          return { roles };
        },
        onError: (_error, _newRoles, context) => {
          if (context?.roles) {
            queryClient.setQueryData<Roles>(["roles", acronym], context.roles);
          }
        },
      },
    );
  };

  public static Join = () =>
    useMutation(
      async ({
        acronym,
        accessToken,
      }: {
        acronym: string;
        accessToken?: string;
      }) =>
        fetch(`fansub/acronym/${acronym}/join`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }),
    );
}
