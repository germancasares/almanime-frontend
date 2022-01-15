import Season from 'enums/Season';
import { Duration } from 'luxon';
import { useQuery } from 'react-query';
import { Anime } from 'types/anime';
import ModelWithMeta from 'types/pagination/ModelWithMeta';

export default class AnimeApi {

  public static GetBySlug = (
    slug?: string,
  ) => useQuery<Anime>(
    ['anime', slug],
    async () => (await fetch(`anime/slug/${slug}`)).json(),
    {
      enabled: !!slug,
      staleTime: Duration.fromObject({ weeks: 1 }).toMillis(),
    },
  );

  public static GetSeason = (
    year: number,
    season: Season,
    page: number,
    includeMeta = false,
  ) => useQuery<ModelWithMeta<Anime[]>>(
    ['animeSeason', year, season, page, includeMeta],
    async () => (await fetch(`anime/year/${year}/season/${season}?page=${page}&includeMeta=${includeMeta}`)).json(),
    { 
      keepPreviousData: true, 
      staleTime: Duration.fromObject({ days: 1 }).toMillis(),
    },
  );

}