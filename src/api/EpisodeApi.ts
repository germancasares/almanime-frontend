import Episode from 'types/episode';
import { Mock, ResponseHelper } from './_helper';

import EpisodesMock from './mocks/episodes.json';

class EpisodeApi {
  static readonly Mocks: Mock[] = [
    {
      method: 'GET',
      path: 'episode/animeSlug/:animeSlug',
      response: ResponseHelper.Ok(EpisodesMock),
    },
  ];

  public static async GetByAnimeSlug(animeSlug: string): Promise<Episode[]> {
    return (await fetch(`episode/anime/${animeSlug}`)).json();
  }
}

export default EpisodeApi;
