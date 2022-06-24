import { useQuery } from 'react-query';
import { Duration } from 'luxon';

import { Episode, EpisodeFansubs } from 'types/episode';

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

  public static GetFansubs = (
    animeSlug?: string,
  ) => useQuery<EpisodeFansubs>(
    ['episodeFansubs', animeSlug],
    async () => (await fetch(`episode/anime/${animeSlug}/fansubs`)).json(),
    {
      enabled: !!animeSlug,
      staleTime: Duration.fromObject({ hours: 1 }).toMillis(),
    },
  );
}
