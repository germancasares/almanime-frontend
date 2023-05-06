import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Duration } from 'luxon';

import { AnimeSubtitles, Subtitle, SubtitleDTO } from 'types/subtitle';

export default class SubtitleApi {
  public static GetByAnimeSlug = (
    animeSlug?: string,
  ) => useQuery<AnimeSubtitles>(
    ['animeSubtitles', animeSlug],
    async () => (await fetch(`subtitle/anime/${animeSlug}`)).json(),
    {
      enabled: !!animeSlug,
      staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
    },
  );

  public static Publish = () => {
    const queryClient = useQueryClient();

    return useMutation(async ({
      fansubAcronym, animeSlug, episodeNumber, token,
    }: {
      id: string;
      fansubAcronym: string;
      animeSlug: string;
      episodeNumber: number;
      token?: string;
    }) => (await fetch(`subtitle/fansub/${fansubAcronym}/anime/${animeSlug}/episode/${episodeNumber}/publish`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).json(), {
      onMutate: async ({ fansubAcronym, token, id }) => {
        await queryClient.cancelQueries(['subtitles', 'published', fansubAcronym]);
        await queryClient.cancelQueries(['subtitles', 'drafts', fansubAcronym, token]);
        const publishedSubtitles = queryClient.getQueryData<Subtitle[]>(['subtitles', 'published', fansubAcronym]);
        const unpublishedSubtitles = queryClient.getQueryData<Subtitle[]>(
          ['subtitles', 'drafts', fansubAcronym, token],
        );

        const subtitleToPublish = unpublishedSubtitles?.find((subtitle) => subtitle.id === id);

        if (subtitleToPublish) {
          const newPublishedSubtitles = publishedSubtitles
            ? [...publishedSubtitles, subtitleToPublish]
            : [subtitleToPublish];

          queryClient.setQueryData<Subtitle[]>(
            ['subtitles', 'published', fansubAcronym],
            newPublishedSubtitles,
          );

          queryClient.setQueryData<Subtitle[]>(
            ['subtitles', 'drafts', fansubAcronym, token],
            unpublishedSubtitles?.filter((subtitle) => subtitle.id !== id) ?? [],
          );
        }

        return { publishedSubtitles, unpublishedSubtitles };
      },
      onError: (error, subtitle, context) => {
        if (context?.publishedSubtitles) {
          queryClient.setQueryData<Subtitle[]>(
            ['subtitles', 'published', subtitle.fansubAcronym],
            context.publishedSubtitles,
          );
        }

        if (context?.unpublishedSubtitles) {
          queryClient.setQueryData<Subtitle[]>(
            ['subtitles', 'unpublished', subtitle.fansubAcronym, subtitle.token],
            context.unpublishedSubtitles,
          );
        }
      },
    });
  };

  public static Unpublish = () => {
    const queryClient = useQueryClient();

    return useMutation(async ({
      fansubAcronym, animeSlug, episodeNumber, token,
    }: {
      id: string,
      fansubAcronym: string;
      animeSlug: string;
      episodeNumber: number;
      token?: string;
    }) => (await fetch(`subtitle/fansub/${fansubAcronym}/anime/${animeSlug}/episode/${episodeNumber}/unpublish`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).json(), {
      onMutate: async ({ fansubAcronym, token, id }) => {
        await queryClient.cancelQueries(['subtitles', 'published', fansubAcronym]);
        await queryClient.cancelQueries(['subtitles', 'drafts', fansubAcronym, token]);
        const publishedSubtitles = queryClient.getQueryData<Subtitle[]>(['subtitles', 'published', fansubAcronym]);
        const unpublishedSubtitles = queryClient.getQueryData<Subtitle[]>(
          ['subtitles', 'drafts', fansubAcronym, token],
        );

        const subtitleToUnpublish = publishedSubtitles?.find((subtitle) => subtitle.id === id);

        if (subtitleToUnpublish) {
          const newUnpublishedSubtitles = unpublishedSubtitles
            ? [...unpublishedSubtitles, subtitleToUnpublish]
            : [subtitleToUnpublish];

          queryClient.setQueryData<Subtitle[]>(
            ['subtitles', 'drafts', fansubAcronym, token],
            newUnpublishedSubtitles,
          );

          queryClient.setQueryData<Subtitle[]>(
            ['subtitles', 'published', fansubAcronym],
            publishedSubtitles?.filter((subtitle) => subtitle.id !== id) ?? [],
          );
        }

        return { publishedSubtitles, unpublishedSubtitles };
      },
      onError: (error, subtitle, context) => {
        if (context?.publishedSubtitles) {
          queryClient.setQueryData<Subtitle[]>(
            ['subtitles', 'published', subtitle.fansubAcronym],
            context.publishedSubtitles,
          );
        }

        if (context?.unpublishedSubtitles) {
          queryClient.setQueryData<Subtitle[]>(
            ['subtitles', 'unpublished', subtitle.fansubAcronym, subtitle.token],
            context.unpublishedSubtitles,
          );
        }
      },
    });
  };

  public static Post = () => useMutation(async ({
    subtitle: {
      fansubAcronym,
      animeSlug,
      episodeNumber,
      language,
      file,
    },
    token,
  } : { subtitle: SubtitleDTO, token?: string }) => {
    const formData = new FormData();

    formData.append('animeSlug', animeSlug);
    formData.append('episodeNumber', episodeNumber.toString());
    formData.append('fansubAcronym', fansubAcronym);
    formData.append('language', language);
    formData.append('file', file);

    return (await fetch('subtitle', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).json();
  });
}
