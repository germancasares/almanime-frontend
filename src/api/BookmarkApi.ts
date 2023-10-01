import { useMutation, useQuery, useQueryClient } from 'react-query';

import { BookmarkDTO } from 'types/bookmark';

export default class BookmarkApi {
  public static Get = (
    accessToken?: string,
  ) => useQuery<string[]>(
    ['bookmarks', accessToken],
    async () => (await fetch('bookmark', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })).json(),
    {
      enabled: !!accessToken,
    },
  );

  public static Create = () => {
    const queryClient = useQueryClient();

    return useMutation(
      async ({ slug, accessToken }: BookmarkDTO) => (
        fetch(`bookmark/animeSlug/${slug}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
      ),
      {
        onMutate: async ({ accessToken, slug }: BookmarkDTO) => {
          await queryClient.cancelQueries(['bookmarks', accessToken]);
          const bookmarks = queryClient.getQueryData<string[]>(['bookmarks', accessToken]);

          if (bookmarks) {
            queryClient.setQueryData<string[]>(
              ['bookmarks', accessToken],
              [...bookmarks, slug],
            );
          }

          return { bookmarks };
        },
        onError: (error, newBookmark, context) => {
          if (context?.bookmarks) {
            queryClient.setQueryData<string[]>(['bookmarks', newBookmark.accessToken], context.bookmarks);
          }
        },
      },
    );
  };

  public static Delete = () => {
    const queryClient = useQueryClient();

    return useMutation(
      async ({ slug, accessToken }: BookmarkDTO) => (
        fetch(`bookmark/animeSlug/${slug}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
      ),
      {
        onMutate: async (newBookmark: BookmarkDTO) => {
          await queryClient.cancelQueries(['bookmarks', newBookmark.accessToken]);
          const bookmarks = queryClient.getQueryData<string[]>(['bookmarks', newBookmark.accessToken]);

          if (bookmarks) {
            queryClient.setQueryData<string[]>(
              ['bookmarks', newBookmark.accessToken],
              bookmarks.filter((bookmark) => bookmark !== newBookmark.slug),
            );
          }

          return { bookmarks };
        },
        onError: (error, newBookmark, context) => {
          if (context?.bookmarks) {
            queryClient.setQueryData<string[]>(['bookmarks', newBookmark.accessToken], context.bookmarks);
          }
        },
      },
    );
  };
}
