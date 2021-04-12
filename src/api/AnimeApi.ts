import Season from 'enums/Season';
import Anime from 'types/anime';
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

  // public static async GetBySlug(slug: string): Promise<AnimeWithEpisodes> {
  //   const anime = (await Axios.get(`anime/slug/${slug}`)).data;

  //   // anime.startDate is string even though is defined as DateTime in Typescript.
  //   anime.startDate = Helper.StringToDateTime(anime.startDate.toString());

  //   // The same for the episode.aired DateTimes.
  //   anime.episodes.forEach(
  //     (episode: Episode) => episode.aired = episode.aired !== null
  //       ? Helper.StringToDateTime(episode.aired.toString())
  //       : episode.aired,
  //   );

  //   return anime;
  // }

  public static async GetBySlug(slug: string): Promise<Anime> {
    const anime: Anime = await (await fetch(`anime/slug/${slug}`)).json();

    return anime;
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
