import { useMutation, useQuery, useQueryClient } from 'react-query';

import { BookmarkDTO } from 'types/bookmark';

export default class BookmarkApi {
  public static Get = (
    token?: string,
  ) => useQuery<string[]>(
    ['bookmarks', token],
    async () => (await fetch('bookmark', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).json(),
    {
      enabled: !!token,
    },
  );

  public static Create = () => {
    const queryClient = useQueryClient();

    return useMutation(
      async ({ slug, token }: BookmarkDTO) => (
        fetch(`bookmark/animeSlug/${slug}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      ),
      {
        onMutate: async ({ token, slug }: BookmarkDTO) => {
          await queryClient.cancelQueries(['bookmarks', token]);
          const bookmarks = queryClient.getQueryData<string[]>(['bookmarks', token]);

          if (bookmarks) {
            queryClient.setQueryData<string[]>(
              ['bookmarks', token],
              [...bookmarks, slug],
            );
          }

          return { bookmarks };
        },
        onError: (error, newBookmark, context) => {
          if (context?.bookmarks) {
            queryClient.setQueryData<string[]>(['bookmarks', newBookmark.token], context.bookmarks);
          }
        },
      },
    );
  };

  public static Delete = () => {
    const queryClient = useQueryClient();

    return useMutation(
      async ({ slug, token }: BookmarkDTO) => (
        fetch(`bookmark/animeSlug/${slug}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      ),
      {
        onMutate: async (newBookmark: BookmarkDTO) => {
          await queryClient.cancelQueries(['bookmarks', newBookmark.token]);
          const bookmarks = queryClient.getQueryData<string[]>(['bookmarks', newBookmark.token]);

          if (bookmarks) {
            queryClient.setQueryData<string[]>(
              ['bookmarks', newBookmark.token],
              bookmarks.filter((bookmark) => bookmark !== newBookmark.slug),
            );
          }

          return { bookmarks };
        },
        onError: (error, newBookmark, context) => {
          if (context?.bookmarks) {
            queryClient.setQueryData<string[]>(['bookmarks', newBookmark.token], context.bookmarks);
          }
        },
      },
    );
  };
}
