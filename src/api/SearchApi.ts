import { AnimeIndex } from 'types/anime';

class SearchApi {
  public static async Anime(query: string): Promise<AnimeIndex[]> {
    return (await fetch(`search/anime/${query}`)).json();
  }
}

export default SearchApi;
