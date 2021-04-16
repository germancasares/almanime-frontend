import { AnimeIndex } from 'types/anime';
import { Mock, ResponseHelper } from './_helper';

import SearchWoMock from './mocks/searchWo.json';

class SearchApi {
  static readonly Mocks: Mock[] = [
    {
      method: 'GET',
      path: 'search/anime/wo',
      response: ResponseHelper.Ok(SearchWoMock),
    },
    {
      method: 'GET',
      path: 'search/anime/:anime',
      response: ResponseHelper.Ok([]),
    },
  ];

  public static async Anime(query: string): Promise<AnimeIndex[]> {
    return (await fetch(`search/anime/${query}`)).json();
  }
}

export default SearchApi;
