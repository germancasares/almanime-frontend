import Season from 'enums/Season';
import Anime, { AnimeWithEpisodes } from 'types/anime';
import ModelWithMeta from 'types/pagination/ModelWithMeta';
import { Mock, ResponseHelper } from './_helper';

import AnimeSeasonMock from './mocks/animeSeason.json';
import AnimeMock from './mocks/anime.json';

class AnimeApi {
  static readonly Mocks: Mock[] = [
    {
      method: 'GET',
      path: 'anime/year/:year/season/:season',
      response: ResponseHelper.Ok(AnimeSeasonMock),
    },
    {
      method: 'GET',
      path: 'anime/slug/:slug',
      response: ResponseHelper.Ok(AnimeMock),
    },
  ];

  public static async GetBySlug(slug: string): Promise<AnimeWithEpisodes> {
    return (await fetch(`anime/slug/${slug}`)).json();
  }

  public static async GetSeason(
    year: number,
    season: Season,
    page: number,
    includeMeta = false,
  ): Promise<ModelWithMeta<Anime[]>> {
    return (
      await fetch(`anime/year/${year}/season/${season}?page=${page}&includeMeta=${includeMeta}`)
    ).json();
  }
}

export default AnimeApi;
