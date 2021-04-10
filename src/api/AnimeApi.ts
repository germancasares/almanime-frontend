import Season from 'enums/Season';
import Anime from 'types/Anime';
import ModelWithMeta from 'types/pagination/ModelWithMeta';
import { Mock, ResponseHelper } from './_helper';

import AnimeSeasonMock from './mocks/animeSeason.json';

class AnimeApi {
  static readonly Mocks: Mock[] = [
    {
      method: 'GET',
      regex: /anime\/year\/\d+\/season\/\w+\?.+/,
      response: ResponseHelper.Ok(AnimeSeasonMock),
    },
  ];

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
