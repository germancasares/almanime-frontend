import { useQuery } from 'react-query';
import { Duration } from 'luxon';

import { Episode } from 'types/episode';

export default class EpisodeApi {
  public static GetByAnimeSlug = (
    animeSlug?: string,
  ) => useQuery<Episode[]>(
    ['episodes', animeSlug],
    async () => (await fetch(`episode/anime/${animeSlug}`)).json(),
    {
      enabled: !!animeSlug,
      staleTime: Duration.fromObject({ weeks: 1 }).toMillis(),
    },
  );
}
